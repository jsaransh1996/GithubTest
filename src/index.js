const fetch = require("node-fetch");

// let host = "https://api.github.com";
let args = process.argv.slice(2);
let host = args[0];
console.log(host);

let org = "Flipkart";
let repo = "fk-ios-app";
let branchesURL = `${host}/repos/${org}/${repo}/branches`;

getReponse(branchesURL).then((branches) => {
  console.log(branches);
  let master = branches.filter((branch) => branch["name"] === "master")[0];
  let latestCommit = master["commit"]["sha"];

  let commitURL = `${host}/repos/${org}/${repo}/git/commits/${latestCommit}`;

  getReponse(commitURL).then((commitDetails) => {
    console.log(commitDetails);
    let message = commitDetails["message"];
    let authorName = commitDetails["author"]["name"];
    var proceed = true;
    if (message.startsWith("Bumped app version") && authorName == "ghe-admin") {
      proceed = false;
      console.log(proceed);
    }
    console.log(proceed);
  });
});

function getReponse(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.length && data.length > 0) {
        return Promise.resolve(data);
      } else {
        Promise.reject(new Error("API - Check the API URL")).then(
          resolved,
          rejected
        );
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
