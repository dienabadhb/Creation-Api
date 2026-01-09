const i18nMiddleware = (req, res, next) => {
    const lang = req.headers['accept-language']?.split(',')[0].split('-')[0] || 'fr';
    const originalJson = res.json;

    res.json = function (data) {
        const translate = (item) => {
            if (!item || typeof item !== 'object') return item;

            const rawItem = item.toJSON ? item.toJSON() : item;
            const fields = item.constructor.translatableFields || [];

            fields.forEach(field => {
                if (rawItem[field] && typeof rawItem[field] === 'object') {
                    rawItem[field] = rawItem[field][lang] || rawItem[field]['fr'] || Object.values(rawItem[field])[0];
                }
            });

            return rawItem;
        };

        const translatedData = Array.isArray(data) 
            ? data.map(item => translate(item)) 
            : translate(data);

        return originalJson.call(this, translatedData);
    };

    next();
};

export default i18nMiddleware;