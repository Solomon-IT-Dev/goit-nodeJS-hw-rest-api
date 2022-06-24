const { User } = require("../../models");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    res.status(404).json({
      status: "Not Found",
      code: 404,
      message: "User not found",
    });
    return;
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    status: "OK",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
