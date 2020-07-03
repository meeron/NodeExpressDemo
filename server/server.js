const express = require('express'),
    bodyParser = require('body-parser');

const port = 3000;
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

routes(app);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));