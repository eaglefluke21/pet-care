import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    googleId: {
        type: String,
        
    },

    username:{
        type:String,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    image: {
        type:String,
        trim:true,
    },

    password:{
        type:String,
        trim:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

    role:{type: String, enum: ['admin','user','guest'], default:'user'},

    resetPasswordToken: String,
    resetPasswordExpires: Date
});


const UserModel = mongoose.model('PetCareUsers',userSchema);

export default UserModel;