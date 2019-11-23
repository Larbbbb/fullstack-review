const request = require('request');
const config = require('../config.js');

let getReposByUsername = (/* TODO */username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  var url = `https://api.github.com/users/${username}/repos`;

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, repos) => {
    console.log('got the user\'s repos!');
    callback(err, repos);
  });
}

module.exports.getReposByUsername = getReposByUsername;