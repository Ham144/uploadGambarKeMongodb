import { Router } from "express";
import { getAllGambars, uploadGambar } from "../controllers/gambar-controller.js";


const router = Router()

//get 
router.get("/getAllGambar", getAllGambars)

//post
router.post("/uploadGambar", uploadGambar)

export default router