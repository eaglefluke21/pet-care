import UserModel from "../models/User.js";
import connect from "../config/db.js";
import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResetEmail } from "../utils/email.js";
import crypto from 'crypto';
import AdminBreedModel from "../models/AdminBreeds.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connect();

dotenv.config();

const decryptKey = process.env.KEY; 

const jwtsecret = process.env.JWT_SECRET;

// function to check if decrypt key is working or not 
export function checkenv(req,res) {

    res.send({msg : decryptKey});

};

export function checkreq(req,res) {
    res.send({msg: 'its me admin'})
};


// logic to send key for encryption 
export async function cryptoEncryption(req,res) {
        res.send({msgkey: decryptKey});
}




// logic fo Login
export async function userLogin(req,res) {
    const {email, password} = req.body;
    try {

     let user = await UserModel.findOne({email});

     if(!user){
        return res.status(400).json({msg:"Invalid Email or Password"});
     }

     const decryptedPassword = CryptoJS.AES.decrypt(password,decryptKey).toString(CryptoJS.enc.Utf8);

     const isMatch = await bcrypt.compare(decryptedPassword,user.password);

    if(!isMatch){
        return res.status(400).json({msg:"Password did not match"});
    }

    const payload = {
        user:{
            id:user.id,
            role:user.role,
        }
    };

    jwt.sign(
        payload,
        jwtsecret,
        {expiresIn : '1h'},
        (err,token) => {
            if (err) {
                console.error('Error generating token:',err);
                return res.status(500).json({msg:"Error generating token"});
            }

            res.status(201).json({"jwt": token , msg : "jwt created!"})
            console.log("logged In succesfully");
        }
    );

    } catch(error) {
        console.log("Error occured:", error);
        res.status(500).json({err: 'Server Error'});
    }
}


//logic to create admin account 

export async function adminRegister(req,res) {
    const { username, email , password ,role} = req.body;

    

    try {
        
    
        const decryptedPassword = CryptoJS.AES.decrypt(password,decryptKey).toString(CryptoJS.enc.Utf8);
    
        console.log('orgpass',decryptedPassword);
    
        let user = await UserModel.findOne({email});
    
        if (user) {
           return res.status(400).json({ msg : 'Admin already exists'});
        }
    
        const hashedPassword = await bcrypt.hash(decryptedPassword,10);
    
        console.log('hash',hashedPassword);
    
        user = new UserModel({
            username,
            email,
            password:hashedPassword,
            role,
        });
    
        await user.save();
    
        res.status(201).json(
            {msg: 'User created sucessfully'  }
        );
    
    
    } catch (error) {
    
        console.error(error.message);
        res.status(500).json({err:'Server Error'})
    }
    
        console.log("route working");
}




// logic for user account
export async function userRegister (req,res) {

const { username, email , password ,role} = req.body;


try {
    
    

    console.log("password value",password);

    const decryptedPassword = CryptoJS.AES.decrypt(password,decryptKey).toString(CryptoJS.enc.Utf8);

    console.log('decrypted password ',decryptedPassword);

    if (!decryptedPassword || decryptedPassword.trim() === "") {
        return res.status(400).json({ msg: 'Password is required for email signup' });
      }

    let user = await UserModel.findOne({email});

    if (user) {
       return res.status(400).json({ msg : 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(decryptedPassword,10);

    console.log('hash',hashedPassword);

    user = new UserModel({
        username,
        email,
        password:hashedPassword,
        role,
    });

    await user.save();

    res.status(201).json(
        {msg: 'User created sucessfully'  }
    );


} catch (error) {

    console.error(error.message);
    res.status(500).json({err:'Server Error'})
}

    console.log("route working");
}


//logic to request password reset

export async function forgotPassword(req,res) {

    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ msg : 'User Not found'});
  
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = Date.now() + 3600000; 
  
    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();
  
    sendResetEmail(email, token);
    res.status(201).json(
        {msg: 'Password reset email sent'  }
    );

}


//logic to reset password

export async function resetPassword(req,res){

    const { token } = req.params;
  const { password } = req.body;
  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({msg:'Invalid or expired token'});

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(201).json(
    {msg: 'Password reset successful'  }
);

};



// Upload Breeds data

export async function AdminBreed(req,res) {
    try{
        const {breedname, group , lifespan,size,origin,description} = req.body;
        const image = req.file ? req.file.filename : '';

        const newBreed = new AdminBreedModel({
            breedname,
            group,
            lifespan,
            size,
            origin,
            description,
            image
        });

        await newBreed.save();
        res.status(201).json(newBreed);

    } catch(error){
        res.status(500).json({error: 'Failed to add breed'});
    }

};


//fetch breeds data

export async function Breeds(req,res) {
    try {

        const breeds  = await AdminBreedModel.find();

        res.status(200).json(breeds);



    }catch(error) {
        res.status(500).json({error: 'Failed to Fetch breeds'});
    }
    };


// update breeds data

export async function updateBreed(req, res) {
    try {
        const { id } = req.params;
        const { breedname, group, lifespan, size, origin, description } = req.body;
        let image = req.file ? req.file.filename : '';

        const breed = await AdminBreedModel.findById(id);

        if (!breed) {
            return res.status(404).json({ error: 'Breed not found' });
        }

        if (req.file) {
            // Delete old image if new image is provided
            const oldImagePath = path.join(__dirname, '..', 'uploads', breed.image);

            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error('Failed to delete old image', err);
                }
            });
        } else {
            image = breed.image; // If no new image, keep the old image path
        }

        const updatedBreed = await AdminBreedModel.findByIdAndUpdate(
            id,
            { breedname, group, lifespan, size, origin, description, image },
            { new: true }
        );

        res.status(200).json(updatedBreed);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update breed' });
    }
}



// Delete Breeds


export async function deleteBreed(req, res) {
    try {
        const { id } = req.params;

        const breed = await AdminBreedModel.findById(id);

        if (!breed) {
            return res.status(404).json({ error: 'Breed not found' });
        }

        const imagePath = path.join(__dirname, '..', 'uploads', breed.image);

        await AdminBreedModel.findByIdAndDelete(id);

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Failed to delete image', err);
                return res.status(500).json({ error: 'Failed to delete image' });
            }

            res.status(200).json({ message: 'Breed deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete breed' });
    }
}

