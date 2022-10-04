const express = require('express');
const router = express.Router();

const controller = require('../../controllers/authControllers');
const avatarController = require('../../controllers/avatarController');
const { validation, authentication, upload } = require('../../middlewares');
const {
  schemaSignUp,
  schemaLogin,
  schemaSubscription,
} = require('../../schemas/userValidationSchema');

router.post('/signup', validation(schemaSignUp), controller.signUpCtrl);
router.post('/login', validation(schemaLogin), controller.loginCtrl);
router.get('/current', authentication, controller.currentCtrl);
router.patch('/logout', authentication, controller.logoutCtrl);
router.patch('/', authentication, validation(schemaSubscription), controller.subscriptionCtrl);
router.patch('/avatars', authentication, upload.single('avatars'), avatarController);

module.exports = router;
