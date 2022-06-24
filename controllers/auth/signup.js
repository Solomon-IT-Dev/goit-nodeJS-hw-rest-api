const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../helpers/sendEmail");
const { PORT = 3000 } = require("../../helpers/evn");

const signup = async (req, res) => {
  const {
    password,
    email,
    subscription = "starter",
    verify = false,
  } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({
      status: "Conflict",
      code: 409,
      message: `Email ${email} in use`,
    });
    return;
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const avatarURL = gravatar.url(email, { protocol: "http", s: "250" });

  const verificationToken = uuidv4();

  await User.create({
    password: hashPassword,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  const link = `http://localhost:${PORT}/api/auth/verify/${verificationToken}`;

  const verificationEmail = {
    to: email,
    subject: "Email verification from Contacts service",
    html: `<p>Click on the link to verify your email address: <a target="_blank" href=${link}>VERIFICATION LINK</a></p>`,
  };

  await sendEmail(verificationEmail);

  res.status(201).json({
    status: "Created",
    code: 201,
    message: "User was created",
    data: {
      userData: {
        email,
        subscription,
        avatarURL,
        verify,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
