// controllers/artist.controller.js
import Artist from "../models/Artist.js";
import { generateArtistLinks } from "../utils/hateoas.js";

// Liste tous les artistes
export const getAll = async (req, res, next) => {
  try {
    const artists = await Artist.findAll();
    const links = generateArtistLinks(req, artists);
    res.sendFormatted({ data: artists, links });
  } catch (err) {
    next(err);
  }
};

// Détail d’un artiste
export const getOne = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.sendStatus(404);
    const links = generateArtistLinks(req, artist);
    res.sendFormatted({ data: artist, links });
  } catch (err) {
    next(err);
  }
};

// Créer un nouvel artiste
export const createArtist = async (req, res, next) => {
  try {
    // 🔹 Ne prendre que les champs définis dans le modèle
    const artistData = {
      name: req.body.name,
      genre: req.body.genre || null, // si pas fourni, null
    };

    // Vérification simple
    if (!artistData.name) {
      return res.status(400).json({
        errors: { message: "Le champ 'name' est obligatoire" }
      });
    }

    const artist = await Artist.create(artistData);
    const links = generateArtistLinks(req, artist);
    res.status(201).sendFormatted({ data: artist, links });
  } catch (err) {
    next(err);
  }
};

// Mettre à jour un artiste
export const updateArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.sendStatus(404);

    const updateData = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.genre) updateData.genre = req.body.genre;

    await artist.update(updateData);

    const links = generateArtistLinks(req, artist);
    res.sendFormatted({ data: artist, links });
  } catch (err) {
    next(err);
  }
};

// Supprimer un artiste
export const deleteArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.sendStatus(404);

    await artist.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};