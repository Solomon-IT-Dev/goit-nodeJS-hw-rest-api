const { Contact } = require("../../models");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const updatedContact = await Contact.findOneAndUpdate(
    {
      owner: _id,
      _id: contactId,
    },
    req.body,
    {
      new: true,
    }
  ).populate("owner", "_id email subscription avatarURL verify");

  if (!updatedContact) {
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
    message: "Contact updated",
    data: {
      result: updatedContact,
    },
  });
};

module.exports = updateById;
