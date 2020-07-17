import express from 'express';
import bodyParser from 'body-parser';
import dbProvider from './providers/dbProvider.js';
import routes from './routes.js';
import customEnv from 'custom-env';

// Read custom environment variables
customEnv.env(process.env.NODE_ENV ?? 'prod');

const port = process.env.NodeExpressDemo_Port ?? 3000;

const app = express();
app.use((req, res, next) => {
    //res.status(401).json({});
    next();
});
app.use(bodyParser.json());

routes(app);

// mongod --config /usr/local/etc/mongod.conf --fork
dbProvider.init().then(() => {
    app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
}).catch(err => {
    console.error('ERR:', err);
});