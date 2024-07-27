import { Router } from "express";
import { userRegister } from "../controllers/userController.js";
import { adminRegister } from "../controllers/userController.js";
import { userLogin } from "../controllers/userController.js";
import { checkenv } from "../controllers/userController.js";
import { checkreq } from "../controllers/userController.js";
import { cryptoEncryption } from "../controllers/userController.js";
import RoleCheck from "../middleware/roleCheck.js";
import { forgotPassword } from "../controllers/userController.js";
import { resetPassword } from "../controllers/userController.js";
import { AdminBreed } from "../controllers/userController.js";
import { Breeds } from "../controllers/userController.js";
import upload from "../middleware/uploadMiddleware.js";

function userRoutes () {
    const router = Router();
    router.get('/env', RoleCheck('user'),checkenv);

    router.get('/admin', RoleCheck('admin'),checkreq);


    router.get('/getEncryptkey',cryptoEncryption);

   router.get('/breeds',Breeds);

    router.post('/register',userRegister);

    router.post('/adminregister',adminRegister);

    router.post('/login',userLogin);

    router.post('/forgot-password',forgotPassword);

    router.post('/reset-password/:token', resetPassword);

    router.post('/adminbreeds', upload.single('image'), AdminBreed);

    

    return router;
};

export default userRoutes;