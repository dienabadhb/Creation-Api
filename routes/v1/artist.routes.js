import express from "express";
import { getAll, getOne, createArtist, updateArtist, deleteArtist } from "../../controllers/artist.controller.js";


const router = express.Router();

// CRUD complet pour artistes
router.get("/artists", getAll);           
router.get("/artists/:id", getOne);       
router.post("/artists", createArtist);    
router.patch("/artists/:id", updateArtist); 
router.delete("/artists/:id", deleteArtist); 

export default router;