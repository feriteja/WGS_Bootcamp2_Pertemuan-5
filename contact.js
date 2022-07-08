const validator = require("validator");
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questionInput = (ask) => {
  return new Promise((res) => {
    rl.question(ask, (inputVal) => {
      res(inputVal);
    });
  });
};

const checkContactFile = () => {
  const dirPath = "./data";
  const isFolderExist = fs.existsSync(dirPath);
  if (!isFolderExist) {
    console.log("Creating folder 'data'");
    fs.mkdirSync(dirPath);
  }

  const dataPath = "./data/Contact.json";
  if (!fs.existsSync(dataPath)) {
    console.log("Creating file 'Contact'");
    fs.writeFileSync(dataPath, "[]", "utf-8");
  }
};

const writeContactFile = (contact) => {
  checkContactFile();
  const file = fs.readFileSync("data/Contact.json", "utf8");
  const contacts = JSON.parse(file);
  contacts.push(contact);
  fs.writeFileSync("data/Contact.json", JSON.stringify(contacts));
};

module.exports = { questionInput, checkContactFile, rl, writeContactFile };
