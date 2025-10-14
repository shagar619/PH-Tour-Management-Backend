import { Router } from "express";




const router = Router();

router.post("/register", UserControllers.createUser);
router.get("/all-users", UserControllers.getAllUsers);

export const UserRoutes = router;