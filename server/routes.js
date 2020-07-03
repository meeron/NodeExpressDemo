const products = require('./api/products');

const home = [
    { path: '/', handler: () => { return { version: '1.0.0' } } },
]

module.exports = function(expressApp) {
    const routes = home
        .concat(products());

    routes.forEach(route => {
        const method = route.method ?? 'get';
        expressApp[method](route.path, async (req, res) => {
            try {
                res.json(await route.handler(req.params, req.body));   
            } catch (error) {
                console.error('ERROR', error);

                const status = error.status ?? 500;
                const message = error.message ?? 'Server error';

                res.status(status).json({
                    message,
                });
            }
        });
    });
}