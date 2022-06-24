const express = require("express");
const { authCheck, validation, ctrlWrapper } = require("../../middlewares");
const {
  joiSignupSchema,
  joiLoginSchema,
  joiResendVerificationSchema,
} = require("../../models");
const { auth: authCtrl } = require("../../controllers");

const router = express.Router();

router.post(
  "/signup",
  validation(joiSignupSchema),
  ctrlWrapper(authCtrl.signup)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(authCtrl.login));

router.get("/logout", authCheck, ctrlWrapper(authCtrl.logout));

router.get("/verify/:verificationToken", ctrlWrapper(authCtrl.verifyEmail));

router.post(
  "/verify",
  validation(joiResendVerificationSchema),
  ctrlWrapper(authCtrl.resendEmail)
);

module.exports = router;
