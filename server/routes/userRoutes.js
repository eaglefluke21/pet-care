import { Router } from "express";
// Importing Controllers
import { users } from "../controllers/userController.js";



function userRoutes () {
    const router = Router();
    router.get('/', users);

    return router;
};

export default userRoutes;