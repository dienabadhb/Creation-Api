const i18nMiddleware = (req, res, next) => {
  const lang = req.headers['accept-language']?.split(',')[0].split('-')[0] || 'fr';

  const translate = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(translate);

    if (obj.bio && typeof obj.bio === 'object') {
      obj.bio = obj.bio[lang] || obj.bio['fr'] || Object.values(obj.bio)[0];
    }

    for (const key in obj) {
      if (typeof obj[key] === 'object') obj[key] = translate(obj[key]);
    }
    return obj;
  };

  const originalJson = res.json.bind(res);
  res.json = function (body) {
    try {
      if (body && typeof body === 'object') {
        body = translate(body);
      }
    } catch (err) {
      // ignore translation errors and send original body
    }
    return originalJson(body);
  };

  next();
};

export default i18nMiddleware;