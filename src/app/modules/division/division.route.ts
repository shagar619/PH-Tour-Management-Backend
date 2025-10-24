import { Router } from "express";


const router = Router();

router.post("/create");
router.get("/");
router.get("/:slug");
router.patch("/:id");
router.delete("/:id");

export const DivisionRoutes = router;