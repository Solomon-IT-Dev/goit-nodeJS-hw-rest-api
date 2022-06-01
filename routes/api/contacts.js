const express = require("express");
const { validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const contactsOperations = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "Success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      res.status(404).json({
        status: "ERROR",
        code: 404,
        massage: `Contact with ID=${contactId} not found`,
      });
      return;
    }
    res.json({
      status: "Success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", validation(contactSchema), async (req, res, next) => {
  try {
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "Success",
      code: 201,
      message: "Contact added",
      data: {
        result: newContact,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removedContact = await contactsOperations.removeContact(contactId);
    if (!removedContact) {
      res.status(404).json({
        status: "ERROR",
        code: 404,
        massage: `Contact with ID=${contactId} not found`,
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
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", validation(contactSchema), async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contactsOperations.updateContact(
      contactId,
      req.body
    );
    if (!updatedContact) {
      res.status(404).json({
        status: "ERROR",
        code: 404,
        massage: `Contact with ID=${contactId} not found`,
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
  } catch (err) {
    next(err);
  }
});

module.exports = router;
