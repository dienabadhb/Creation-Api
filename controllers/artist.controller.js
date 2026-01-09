// controllers/artist.controller.js
import Artist from "../models/Artist.js";
import { generateArtistLinks } from "../utils/hateoas.js";

// Liste tous les artistes
export const getAll = async (req, res, next) => {
  try {
    const artists = await Artist.findAll();
    const artistsJSON = artists.map(artist => artist.toJSON());
    const links = generateArtistLinks(req, artistsJSON);
    res.sendFormatted({ data: artistsJSON, links });
  } catch (err) {
    next(err);
  }
};

// Détail d’un artiste
export const getOne = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.sendStatus(404);

    const artistJSON = artist.toJSON();
    const links = generateArtistLinks(req, artistJSON);
    res.sendFormatted({ data: artistJSON, links });
  } catch (err) {
    next(err);
  }
};

// Créer un nouvel artiste
export const createArtist = async (req, res, next) => {
  try {
    const { name, genre, bio} = req.body;
    if (!name) {
      return res.status(400).json({ errors: { message: "Le champ 'name' est obligatoire" } });
    }

    const artist = await Artist.create({ name, genre: genre || null, bio: bio || null });
    const artistJSON = artist.toJSON();
    const links = generateArtistLinks(req, artistJSON);

    res.status(201).sendFormatted({ data: artistJSON, links });
  } catch (err) {
    next(err);
  }
};

// Mettre à jour un artiste
export const updateArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.sendStatus(404);

    const { name, genre, bio} = req.body;
    await artist.update({ 
      name: name ?? artist.name,
      genre: genre ?? artist.genre,
      bio: bio ?? artist.bio
    });

    const artistJSON = artist.toJSON();
    const links = generateArtistLinks(req, artistJSON);
    res.sendFormatted({ data: artistJSON, links });
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
    res.sendStatus(204); // No Content
  } catch (err) {
    next(err);
  }
};