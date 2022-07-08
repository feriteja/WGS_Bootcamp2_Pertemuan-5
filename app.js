const validator = require("validator");
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const identity = {};

const inputIdentity = () => {
  rl.question("your  Name: ", (name) => {
    identity.name = name;
    inputNumberPhone();
  });
};

const inputNumberPhone = () => {
  rl.question("Your phone number: ", (number) => {
    const isNumberPhone = validator.isMobilePhone(number, "id-ID");
    if (!isNumberPhone) {
      console.log(`Number ${number} is not valid`);
      return inputNumberPhone();
    }
    identity.phone = number;
    inputEmail();
  });
};

const writeContactFile = (dataContact) => {
  const dirPath = "./data";
  const isFolderExist = fs.existsSync(dirPath);
  if (!isFolderExist) fs.mkdirSync(dirPath);

  const dataPath = "./data/Contact.json";
  const isFileExist = fs.existsSync(dataPath);
  if (!isFileExist) fs.writeFileSync(dataPath, dataContact, "utf-8");

  fs.writeFileSync("data/Contact.json", JSON.stringify(contacts));
};

const inputEmail = () => {
  rl.question("Your Email: ", (email) => {
    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      console.log(`Email ${email} is not valid`);
      return inputEmail();
    }
    identity.email = email;
    console.log(
      `\nYour name: ${identity.name},\nYour phone: ${identity.phone},\nYour email: ${identity.email}`
    );

    const contact = identity;
    const file = fs.readFileSync("data/Contact.json", "utf8");
    const contacts = JSON.parse(file);
    contacts.push(contact);
    writeContactFile(JSON.stringify(contacts));

    rl.close();
  });
};

inputIdentity();
