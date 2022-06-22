const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const removedContact = await Contact.findOneAndRemove({
    owner: _id,
    _id: contactId,
  }).populate("owner", "_id email subscription avatarURL");

  if (!removedContact) {
    res.status(404).json({
      status: "ERROR",
      code: 404,
      message: `Contact with ID=${contactId} not found`,
    });
    return;
  }

  res.json({
    status: "Success",
    code: 200,
    message: "Contact deleted",
    data: {
      result: removedContact,
    },
  });
};

module.exports = removeById;
