const express = require("express");
const { authCheck, validation, ctrlWrapper } = require("../../middlewares");
const { joiContactSchema, joiContactStatusSchema } = require("../../models");
const { contacts: contactsCtrl } = require("../../controllers");

const router = express.Router();

router.get("/", authCheck, ctrlWrapper(contactsCtrl.getAll));

router.get("/:contactId", authCheck, ctrlWrapper(contactsCtrl.getById));

router.post(
  "/",
  authCheck,
  validation(joiContactSchema),
  ctrlWrapper(contactsCtrl.add)
);

router.put(
  "/:contactId",
  authCheck,
  validation(joiContactSchema),
  ctrlWrapper(contactsCtrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authCheck,
  validation(joiContactStatusSchema),
  ctrlWrapper(contactsCtrl.updateStatus)
);

router.delete("/:contactId", authCheck, ctrlWrapper(contactsCtrl.removeById));

module.exports = router;
