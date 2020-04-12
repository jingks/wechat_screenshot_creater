const express = require('express');
const path = require('path');

const app = express();
const port = 80;
const public = 'src';

app.use(express.static(path.join(__dirname, public)));

app.listen(port, () => {
    console.log('App is listening at http://127.0.0.1:' + port);
})