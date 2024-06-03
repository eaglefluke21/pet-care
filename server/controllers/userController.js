import UserModel from "../models/User.js";
import connect from "../config/db.js";
import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
connect();

dotenv.config();

const decryptKey = process.env.KEY; 
const jwtsecret = process.env.JWT_SECRET;

// function to check if decrypt key is working or not 
export function checkenv(req,res) {

    res.send({msg:decryptKey});

};

// logic to check user credentials are valid or not 
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

    // create payload for jwt 
    const payload = {
        user:{
            id:user.id
        }
    };

    // Generate jwt token
    jwt.sign(
        payload,
        jwtsecret,
        {expiresIn : '1h'},
        (err,token) => {
            if (err) {
                console.error('Error generating token:',err);
                return res.status(500).json({msg:"Error generating token"});
            }

            res.cookie('token', token, {
                httpOnly: true, 
                secure: true, 
                sameSite: 'strict' 
              });

            res.status(201).json({msg: "logged In"})
            console.log("logged In succesfully");
        }
    );

    } catch(error) {
        console.log("Error occured:", error);
        res.status(500).json({err: 'Server Error'});
    }
}

// logic to create a user and save into db(Mongodb)
export async function userRegister (req,res) {

const { username, email , password} = req.body;

    

try {
    

    const decryptedPassword = CryptoJS.AES.decrypt(password,decryptKey).toString(CryptoJS.enc.Utf8);

    console.log('orgpass',decryptedPassword);

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


