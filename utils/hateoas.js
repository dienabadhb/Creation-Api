export function generateArtistLinks(req, artist) {
  return {
    self: `${req.baseUrl}/artists/${artist.id}`,
    collection: `${req.baseUrl}/artists`,
    albums: `${req.baseUrl}/albums?artistId=${artist.id}`
  };
}
