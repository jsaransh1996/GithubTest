const fetch = require("node-fetch");
const request = require("request");

// let host = "https://api.github.com";
let args = process.argv.slice(2);
let host = args[0];

let org = "Flipkart";
let repo = "fk-ios-app";
let masterURL = `${host}/repos/${org}/${repo}/branches/master`;
console.log(masterURL);

request.get(masterURL, (error, response, body) => {
  let json = JSON.parse(body);
  console.log(json);
});

// getReponse(masterURL).then((masterData) => {
//   console.log(masterData);
// });
// getReponse(masterURL).then((masterData) => {
//   console.log(masterData);
//   // let message = masterData["commit"]["commit"]["mesage"];
//   // let authorName = masterData["commit"]["commit"]["author"]["name"];
//   // console.log(message);

//   // var proceed = true;
//   // if (message.startsWith("Bumped app version") && authorName == "ghe-admin") {
//   //   proceed = false;
//   //   console.log(proceed);
//   // }
//   // console.log(proceed);

//   // let latestCommit = masterData["commit"]["sha"];
//   // let commitURL = `${host}/repos/${org}/${repo}/git/commits/${latestCommit}`;
//   // getReponse(commitURL).then((commitDetails) => {
//   //   console.log(commitDetails);
//   //   let message = commitDetails["message"];
//   //   let authorName = commitDetails["author"]["name"];
//   //   var proceed = true;
//   //   if (message.startsWith("Bumped app version") && authorName == "ghe-admin") {
//   //     proceed = false;
//   //     console.log(proceed);
//   //   }
//   //   console.log(proceed);
//   // });
// });

function getReponse(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log("Data");
      console.log(data);
      console.log(data["commit"]);
      let message = data["commit"]["commit"]["mesage"];
      console.log(message);

      Promise.resolve(message);
    })
    .catch((err) => {
      console.error(err);
    });
}
