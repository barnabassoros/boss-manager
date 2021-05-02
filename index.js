const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
    res.end('Problem...');
});


//app.use(express.static('static'));
require('./routing/index')(app,__dirname);

app.listen(3000, function () {
    console.log('Hello :3000');
});