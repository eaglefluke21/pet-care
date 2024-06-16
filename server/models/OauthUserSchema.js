import mongoose from "mongoose";

const OauthUserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },

    displayName: {
        type:String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    image: {
        type:String
    },
    email: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role:{type: String, enum: ['admin','user','guest'], default:'user'},


}
);

const OauthUserModel = mongoose.model('OauthUser',OauthUserSchema)

export default OauthUserModel;