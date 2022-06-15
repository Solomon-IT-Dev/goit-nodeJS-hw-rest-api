const express = require("express");
const { authCheck, validation, ctrlWrapper } = require("../../middlewares");
const { joiSubscriptionSchema } = require("../../models");
const { users: usersCtrl } = require("../../controllers");

const router = express.Router();

router.get("/current", authCheck, ctrlWrapper(usersCtrl.getCurrent));

router.post(
  "/",
  authCheck,
  validation(joiSubscriptionSchema),
  ctrlWrapper(usersCtrl.updateSubscription)
);

module.exports = router;
