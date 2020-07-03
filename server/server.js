const express = require('express'),
    bodyParser = require('body-parser'),
    dbProvider = require('./providers/dbProvider');

const port = 3000;
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

routes(app);

console.log('Connecting to MongoDb...');
dbProvider.init().then(() => {
    console.log('Connected.');
    app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
});