const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: String,
  watchers: Number,
  repo_name: String,
  git_URL: String,
  user: String,
  avatar: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {

  // repoData is array of repos
  repos.forEach(repoData => {

    // get necessary info from repoData to input into entry
    var toInput = {
      id: repoData.id,
      watchers: repoData.watchers,
      repo_name: repoData.name,
      git_URL: repoData.html_url,
      user: repoData.owner.login,
      avatar: repoData.owner.avatar_url
    }

    // create new document entry for each repo
    // var dbEntry = new Repo(toInput);

    Repo.findOneAndUpdate({id: toInput.id}, toInput, {new: true, upsert: true}, (err , dbEntry) => {
      //save the document
      dbEntry.save();
    });

  });

  callback();

};


let getInfo = (callback) => {
  Repo.find({}, (err, results) => {
    if (!err) {

      var sortedResults = results.sort(function (a, b) {
        return b.watchers - a.watchers;
      });

      var top25 = sortedResults.slice(0, 25);

      callback(top25);
    }
  });
};


module.exports.save = save;
module.exports.getInfo = getInfo;