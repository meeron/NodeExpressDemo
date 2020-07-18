import authService from './services/auth.js';

function authHandler(req, res, next) {
    const headerValue = req.headers['authorization'];
    if (headerValue) {
        const token = headerValue.replace('Bearer ', '');
        const payload = authService.decodeToken(token);
        if (payload && payload.expiresAt > Date.now()) {
            next();
            return;
        }
    }

    res.status(403).json({});
}

export default authHandler;