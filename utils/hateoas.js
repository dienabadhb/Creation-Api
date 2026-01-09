
export function generateArtistLinks(req, data) {
  if (Array.isArray(data)) {
    return data.map(item => ({
      self: `${req.baseUrl}/artists/${item.id}`,
      collection: `${req.baseUrl}/artists`,
      albums: `${req.baseUrl}/albums?artistId=${item.id}`
    }));
  }

  return {
    self: `${req.baseUrl}/artists/${data.id}`,
    collection: `${req.baseUrl}/artists`,
    albums: `${req.baseUrl}/albums?artistId=${data.id}`
  };
}