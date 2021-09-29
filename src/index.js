const fetch = require("node-fetch");

// let host = "https://api.github.com";
let args = process.argv.slice(2);
let host = args[0];

let org = "Flipkart";
let repo = "fk-ios-app";
let masterURL = `${host}/repos/${org}/${repo}/branches/master`;
console.log(masterURL);

getReponse(masterURL).then((masterData) => {
  console.log(masterData);
  let message = masterData["commit"]["commit"]["mesage"];
  let authorName = masterData["commit"]["commit"]["author"]["name"];
  console.log(message);

  var proceed = true;
  if (message.startsWith("Bumped app version") && authorName == "ghe-admin") {
    proceed = false;
    console.log(proceed);
  }
  console.log(proceed);

  // let latestCommit = masterData["commit"]["sha"];
  // let commitURL = `${host}/repos/${org}/${repo}/git/commits/${latestCommit}`;
  // getReponse(commitURL).then((commitDetails) => {
  //   console.log(commitDetails);
  //   let message = commitDetails["message"];
  //   let authorName = commitDetails["author"]["name"];
  //   var proceed = true;
  //   if (message.startsWith("Bumped app version") && authorName == "ghe-admin") {
  //     proceed = false;
  //     console.log(proceed);
  //   }
  //   console.log(proceed);
  // });
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
