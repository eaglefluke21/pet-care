import UserModel from "../models/User.js";
import connect from "../config/db.js";
import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

connect();

dotenv.config();

const decryptKey = process.env.KEY; 

export function checkenv(req,res) {

    res.send({msg:decryptKey});

};


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
