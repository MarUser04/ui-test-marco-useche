const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static(__dirname + '/dist/ui-test-marco-useche'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/ui-test-marco-useche/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 4200);