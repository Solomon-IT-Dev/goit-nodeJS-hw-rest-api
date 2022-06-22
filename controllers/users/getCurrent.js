const getCurrent = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.json({
    status: "OK",
    code: 200,
    data: {
      userData: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = getCurrent;
