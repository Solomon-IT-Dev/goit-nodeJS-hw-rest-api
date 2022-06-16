const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { password, email, subscription = "starter" } = req.body;

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
  await User.create({ password: hashPassword, email, subscription });

  res.status(201).json({
    status: "Created",
    code: 201,
    message: "User was created",
    data: {
      userData: {
        email,
        subscription,
      },
    },
  });
};

module.exports = signup;
