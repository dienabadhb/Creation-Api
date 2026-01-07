// controllers/artist.controller.js
import Artist from "../models/Artist.js";
import { generateArtistLinks } from "../utils/hateoas.js";

// GET /artists → liste tous les artistes
export const getAll = async (req, res, next) => {
  try {
    const artists = await Artist.findAll();
    const links = generateArtistLinks(req, artists); // HATEOAS automatique
    res.sendFormatted({ data: artists, links });
  } catch (err) {
    next(err);
  }
};

// GET /artists/:id → détail d’un artiste
export const getOne = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.sendStatus(404);

    const links = generateArtistLinks(req, artist); // HATEOAS pour 1 item
    res.sendFormatted({ data: artist, links });
  } catch (err) {
    next(err);
  }
};

// POST /artists → créer un nouvel artiste
export const createArtist = async (req, res, next) => {
  try {
    const artist = await Artist.create(req.body);
    const links = generateArtistLinks(req, artist);
    res.status(201).sendFormatted({ data: artist, links });
  } catch (err) {
    next(err);
  }
};

// PATCH /artists/:id → mettre à jour un artiste
export const updateArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.sendStatus(404);

    await artist.update(req.body);
    const links = generateArtistLinks(req, artist);
    res.sendFormatted({ data: artist, links });
  } catch (err) {
    next(err);
  }
};

// DELETE /artists/:id → supprimer un artiste
export const deleteArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.sendStatus(404);

    await artist.destroy();
    res.sendStatus(204); // No Content
  } catch (err) {
    next(err);
  }
};

