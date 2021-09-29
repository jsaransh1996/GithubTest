// import fetch from "node-fetch";

const fetch = require("node-fetch");

let host = "https://api.github.com";
let org = "chandrakiranks";
let repo = "git-util";

let branches = await fetch(`${host}/repos/${org}/${repo}/branches`);

let branchesJSON = await branches.json();
let master = branchesJSON.filter((branch) => branch["name"] === "master")[0];
let latestCommit = master["commit"]["sha"];

let commitDetails = await fetch(
  `${host}/repos/${org}/${repo}/git/commits/${latestCommit}`
);

let commitDetailsJSON = await commitDetails.json();
let message = commitDetailsJSON["message"];
let authorName = commitDetailsJSON["author"]["name"];
var proceed = true;
if (message.startsWith("Bumped app version") && authorName == "ghe-admin") {
  proceed = false;
}
console.log(proceed);
