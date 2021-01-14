import products from './api/products.js'; 
import apps from './api/apps.js';
import auth from './api/auth.js';
import authHandler from './authorization.js';
import logger from './services/logger.js';

const home = [
    { path: '/', handler: () => { return { version: '1.0.0' } } },
]

export default function(expressApp) {
    const routes = home
        .concat(products())
        .concat(apps())
        .concat(auth());

    function createAuth(useAuth) {
        return (req, res, next) => {
            if (useAuth) {
                authHandler(req, res, next);
            } else {
                next();
            }
        };
    }

    routes.forEach(route => {
        const method = route.method ?? 'get';
        expressApp[method](route.path, createAuth(route.useAuth), async (req, res) => {
            const start = Date.now();
            let end;
            let responseData;
            let status = 200;
            
            try {
                responseData = await route.handler(req.params, req.body);
                end = Date.now();
                if (!responseData) {
                    status = 204;
                }
            } catch (error) {
                end = Date.now();

                status = error.status ?? 500;
                const message = error.message ?? 'Server error';
                
                logger.error(message, { Status: status });

                responseData = {
                    message,
                };
            } finally {
                res.status(status).json(responseData);
                const duration = end - start;
                
                const msg = `${req.method} ${req.path} in ${duration}ms. Status: ${status}`;
                const meta = { Path: req.path, Duration: duration, Status: status };
                
                logger.debug(msg, meta);
            }
        });
    });
}
