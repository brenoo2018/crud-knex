const express = require('express')
const app = express();
const routes = require('./routes');


const notFoundMiddleware = require('./middlewares/notFoundMiddleware');
const catchAllMiddleware = require('./middlewares/catchAllMiddleware');


app.use(express.json())
app.use(routes);

app.use(notFoundMiddleware);
//catch all
app.use(catchAllMiddleware);

module.exports = app;