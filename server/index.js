const express = require('express');
const Github = require('../helpers/github.js');
const bodyParser = require('body-parser');
const db = require('../database/index.js')
let app = express();

app.use(bodyParser.urlencoded({urlencoded: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = req.body.username;
  console.log(`requesting repos for ${username} from github API`);

  Github.getReposByUsername(username, (err, repos) => {
    if (err) console.log('failed to receive repos from github API :(');
    else {
      console.log(`received repos for ${username} from github API :)`);
      db.save(JSON.parse(repos), () => {
        console.log(`successfully saved repos for ${username} to database`);
        res.status(200).send('wahoo!!');
      });
    }
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.getInfo((top25) => {
    res.status(200).send(top25);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

