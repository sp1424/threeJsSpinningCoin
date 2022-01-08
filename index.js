const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index')
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});