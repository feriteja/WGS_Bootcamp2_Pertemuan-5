const validator = require("validator");
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const identity = {};

// const inputIdentity = () => {
//   rl.question("your  Name: ", (name) => {
//     identity.name = name;
//     inputNumberPhone();
//   });
// };

// const inputNumberPhone = () => {
//   return new Promise((res) => {
//     rl.question("Your phone number: ", (number) => {
//       const isNumberPhone = validator.isMobilePhone(number, "id-ID");
//       if (!isNumberPhone) {
//         console.log(`Number ${number} is not valid`);
//         res(inputNumberPhone());
//       }
//       res(number);
//     });
//   });
// };

// const inputEmail = () => {
//   rl.question("Your Email: ", (email) => {
//     const isEmail = validator.isEmail(email);
//     if (!isEmail) {
//       console.log(`Email ${email} is not valid`);
//       return inputEmail();
//     }
//     identity.email = email;
//     console.log(
//       `\nYour name: ${identity.name},\nYour phone: ${identity.phone},\nYour email: ${identity.email}`
//     );

//     const contact = identity;
//     writeContactFile();
//     const file = fs.readFileSync("data/Contact.json", "utf8");
//     const contacts = JSON.parse(file);
//     contacts.push(contact);

//     fs.writeFileSync("data/Contact.json", JSON.stringify(contacts));

//     rl.close();
//   });
// };

const checkContactFile = () => {
  const dirPath = "./data";
  const isFolderExist = fs.existsSync(dirPath);
  if (!isFolderExist) {
    fs.mkdirSync(dirPath);
  }

  const dataPath = "./data/Contact.json";
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, "[]", "utf-8");
  }
};

const questionInput = (ask) => {
  return new Promise((res) => {
    rl.question(ask, (inputVal) => {
      res(inputVal);
    });
  });
};

const inputIdentity = async () => {
  try {
    const name = await questionInput("What is your name: ");
    const number = await questionInput("What is your number: ");
    const email = await questionInput("What is your email: ");
    rl.close();

    const contact = { name, number, email };

    checkContactFile();

    const file = fs.readFileSync("data/Contact.json", "utf8");
    const contacts = JSON.parse(file);
    contacts.push(contact);
    fs.writeFileSync("data/Contact.json", JSON.stringify(contacts));
  } catch (error) {
    console.log("error", error);
  }
};

inputIdentity();
