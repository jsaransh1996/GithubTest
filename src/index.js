const request = require("request");

let args = process.argv.slice(2);
let host = args[0];

let org = "Flipkart";
let repo = "fk-ios-app";
let masterURL = `${host}/repos/${org}/${repo}/branches/master`;
// console.log(masterURL);

request.get(masterURL, (error, response, body) => {
  let json = JSON.parse(body);
  // console.log(json);
  let message = json.commit.commit.message;
  let authorName = json.commit.commit.author.name;
  // console.log(message);
  // console.log(authorName);

  var proceed = true;
  if (message.startsWith("Bumped app version") && authorName == "Jenkins") {
    proceed = false;
  }
  console.log(proceed);
});
