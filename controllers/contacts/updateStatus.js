const { Contact } = require("../../models");

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id } = req.user;

  const updatedContactStatus = await Contact.findOneAndUpdate(
    {
      owner: _id,
      _id: contactId,
    },
    { favorite },
    { new: true }
  ).populate("owner", "_id email subscription");

  if (!updatedContactStatus) {
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
    message: "Contact status updated",
    data: {
      result: updatedContactStatus,
    },
  });
};

module.exports = updateStatus;
