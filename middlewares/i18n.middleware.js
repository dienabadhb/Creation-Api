const i18nMiddleware = (req, res, next) => {

    const lang = req.headers['accept-language']?.split(',')[0].split('-')[0] || 'fr';


    const originalSend = res.send;

    res.send = function (body) {
        const contentType = res.get('Content-Type');
        
        if (contentType && contentType.includes('application/json')) {
            try {
                let data = JSON.parse(body);

                const translate = (obj) => {
                    if (!obj || typeof obj !== 'object') return obj;
                    if (Array.isArray(obj)) return obj.map(translate);

                    if (obj.bio && typeof obj.bio === 'object') {
                        obj.bio = obj.bio[lang] || obj.bio['fr'] || Object.values(obj.bio)[0];
                    }

                    for (let key in obj) {
                        if (typeof obj[key] === 'object') obj[key] = translate(obj[key]);
                    }
                    return obj;
                };

                data = translate(data);
                body = JSON.stringify(data);
            } catch (e) {
            }
        }
        return originalSend.call(this, body);
    };

    next();
};

export default i18nMiddleware;