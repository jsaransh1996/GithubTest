import fetch from "node-fetch";

let args = process.argv.slice(2);
let host = args[0];
let org = "Flipkart";
let repo = "fk-ios-app";
// let host = "https://api.github.com";
// let org = "chandrakiranks";
// let repo = "git-util";
// let masterURL = `${host}/repos/${org}/${repo}/branches/master`;
// console.log(masterURL);

let masterData = await fetch(masterURL);
let json = await masterData.json();
let message = json["commit"]["commit"]["message"];
let authorName = json["commit"]["commit"]["author"]["name"];
// console.log(message);
// console.log(authorName);

var proceed = true;
if (message.startsWith("Bumped app version") && authorName == "Jenkins") {
  proceed = false;
}
console.log(proceed);
