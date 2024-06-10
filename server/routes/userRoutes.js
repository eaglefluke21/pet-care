import { Router } from "express";
// Importing Controllers
import { userRegister } from "../controllers/userController.js";
import { adminRegister } from "../controllers/userController.js";
import { userLogin } from "../controllers/userController.js";
import { checkenv } from "../controllers/userController.js";
import { checkreq } from "../controllers/userController.js";
import { cryptoEncryption } from "../controllers/userController.js";
import RoleCheck from "../middleware/roleCheck.js";

function userRoutes () {
    const router = Router();
    router.get('/env', RoleCheck('user'),checkenv);

    router.get('/admin', RoleCheck('admin'),checkreq);


    router.get('/getEncryptkey',cryptoEncryption);

    router.post('/register',userRegister);

    router.post('/adminregister',adminRegister);

    router.post('/login',userLogin);
    

    return router;
};

export default userRoutes;