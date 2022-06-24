const { User } = require("../../models");
const { SECRET_KEY } = require("../../helpers/evn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const passCompare = bcrypt.compareSync(password, user.password);

  if (!user || !user.verify || !passCompare) {
    res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: "Email is wrong or not verify, or password is wrong",
    });
    return;
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "OK",
    code: 200,
    message: "Login success",
    data: {
      token,
      userData: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
        verify: user.verify,
      },
    },
  });
};

module.exports = login;
