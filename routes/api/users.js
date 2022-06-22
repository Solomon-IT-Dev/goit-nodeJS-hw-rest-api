const express = require("express");
const {
  authCheck,
  validation,
  ctrlWrapper,
  upload,
} = require("../../middlewares");
const { joiSubscriptionSchema } = require("../../models");
const { users: usersCtrl } = require("../../controllers");

const router = express.Router();

router.get("/current", authCheck, ctrlWrapper(usersCtrl.getCurrent));

router.patch(
  "/",
  authCheck,
  validation(joiSubscriptionSchema),
  ctrlWrapper(usersCtrl.updateSubscription)
);

router.patch(
  "/avatars",
  authCheck,
  upload.single("avatar"),
  ctrlWrapper(usersCtrl.updateAvatar)
);

module.exports = router;
