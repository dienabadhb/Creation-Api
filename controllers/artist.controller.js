import Artist from "../../models/Artist.js";
import generateHateoas from "../utils/hateoas.js";

// GET /artists
export const getAll = async (req, res, next) => {
  try {
    const artists = await Artist.findAll();
    const links = await generateHateoas(req, artists, "Artist");
    res.sendFormatted({ data: artists, links });
  } catch (err) {
    next(err);
  }
};

// GET /artists/:id
export const getOne = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.sendStatus(404);
    const links = await generateHateoas(req, artist, "Artist");
    res.sendFormatted({ data: artist, links });
  } catch (err) {
    next(err);
  }
};

// POST /artists
export const createArtist = async (req, res, next) => {
  try {
    const artist = await Artist.create(req.body);
    const links = await generateHateoas(req, artist, "Artist");
    res.status(201).sendFormatted({ data: artist, links });
  } catch (err) {
    next(err);
  }
};

// PATCH /artists/:id
export const updateArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.sendStatus(404);
    await artist.update(req.body);
    const links = await generateHateoas(req, artist, "Artist");
    res.sendFormatted({ data: artist, links });
  } catch (err) {
    next(err);
  }
};

// DELETE /artists/:id
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

