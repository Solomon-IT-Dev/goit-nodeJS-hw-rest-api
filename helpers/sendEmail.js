const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = require("./evn");

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "lysenko.init@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = sendEmail;
