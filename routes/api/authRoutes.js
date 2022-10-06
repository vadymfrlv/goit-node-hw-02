const express = require('express');
const router = express.Router();

const { authentication, validation, upload } = require('../../middlewares');
const controller = require('../../controllers/authControllers');
const avatarController = require('../../controllers/avatarControllers');
const {
  schemaSignUp,
  schemaLogin,
  schemaSubscription,
  schemaVerifyEmail,
} = require('../../schemas/userValidationSchema');

router.post('/signup', validation(schemaSignUp), controller.signUpCtrl);
router.post('/login', validation(schemaLogin), controller.loginCtrl);
router.get('/current', authentication, controller.currentCtrl);
router.patch('/logout', authentication, controller.logoutCtrl);
router.patch('/', authentication, validation(schemaSubscription), controller.subscriptionCtrl);
router.patch('/avatars', authentication, upload.single('avatars'), avatarController);
router.get('/verify/:verificationToken', controller.emailVerify);
router.post('/verify', validation(schemaVerifyEmail), controller.emailVerifyRepeat);

module.exports = router;
