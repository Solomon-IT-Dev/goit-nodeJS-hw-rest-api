const { Contact } = require("../../models");

const add = async (req, res) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: "Success",
    code: 201,
    message: "Contact added",
    data: {
      result: newContact,
    },
  });
};

module.exports = add;
