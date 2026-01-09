const versioningMiddleware = (version) => {
    return (req, res, next) => {
        const requestedVersion = version || req.headers['x-api-version'] || 'v1';
        if (requestedVersion === 'v1') {
            res.setHeader('Deprecation', 'true');
            
            res.setHeader('Sunset', 'Thu, 31 Dec 2026 23:59:59 GMT');
            
            const v2Url = `${req.protocol}://${req.get('host')}/api/v2${req.path}`;
            res.setHeader('Link', `<${v2Url}>; rel="alternate"`);
        }

        next();
    };
};

export default versioningMiddleware;