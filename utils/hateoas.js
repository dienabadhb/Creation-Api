// utils/hateoas.js
export function generateArtistLinks(req, data) {
  const baseUrl = req.baseUrl; // ex: "/api/v1"

  // Si data est un tableau (collection)
  if (Array.isArray(data)) {
    return data.map(artist => ({
      self: `${baseUrl}/artists/${artist.id}`,
      collection: `${baseUrl}/artists`,
      albums: `${baseUrl}/albums?artistId=${artist.id}`
    }));
  }

  // Si data est un objet (un seul item)
  return {
    self: `${baseUrl}/artists/${data.id}`,
    collection: `${baseUrl}/artists`,
    albums: `${baseUrl}/albums?artistId=${data.id}`
  };
}
