const express = require('express');
const path = require('path')
const app = express();

app.use(express.static('app'))

// Set up a route for index.html.
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.listen(3000, () => {
  console.log('listening on *:3000');
});
