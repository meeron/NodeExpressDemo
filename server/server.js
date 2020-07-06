import express from 'express';
import bodyParser from 'body-parser';
import dbProvider from './providers/dbProvider.js';
import routes from './routes.js';

const port = 3000;

const app = express();
app.use(bodyParser.json());

routes(app);

// mongod --config /usr/local/etc/mongod.conf --fork
console.log('Connecting to MongoDb...');
dbProvider.init().then(() => {
    console.log('Connected.');
    app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
});