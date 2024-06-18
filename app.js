const fs = require("fs");
const generatePage = require("./src/page-template");

var profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

fs.writeFile("index.html", generatePage(name, github), (err) => {
  if (err) throw err;

  console.log("Portfolio complete! Check out index.html to see the output!");
});
