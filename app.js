const { questionInput, rl, writeContactFile } = require("./contact");

const inputIdentity = async () => {
  try {
    const name = await questionInput("What is your name: ");
    const number = await questionInput("What is your number: ");
    const email = await questionInput("What is your email: ");
    rl.close();
    const contact = { name, number, email };

    writeContactFile(contact);

    console.log(
      `\nYour name is: ${name}\nYour number is: ${number}\nYour email is: ${email}`
    );
  } catch (error) {
    console.log("error", error);
  }
};

inputIdentity();
