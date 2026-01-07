import express from "express";
import { getAll, getOne, createArtist, updateArtist, deleteArtist } from "../controllers/artist.controller.js";

const router = express.Router();

// CRUD complet pour artistes
router.get("/artists", getAll);           // Liste tous les artistes
router.get("/artists/:id", getOne);       // Détail d’un artiste
router.post("/artists", createArtist);    // Créer un artiste
router.patch("/artists/:id", updateArtist); // Mettre à jour un artiste
router.delete("/artists/:id", deleteArtist); // Supprimer un artiste

export default router;
