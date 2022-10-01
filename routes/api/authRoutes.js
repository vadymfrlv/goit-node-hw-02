const express = require('express');
const router = express.Router();

const controller = require('../../controllers/authControllers');
const validation = require('../../middlewares/validation');
const authentication = require('../../middlewares/authentication');
const { schema, schemaSubscription } = require('../../schemas/userValidationSchema');

router.post('/signup', validation(schema), controller.signUpCtrl);
router.post('/login', validation(schema), controller.loginCtrl);
router.get('/current', authentication, controller.currentCtrl);
router.get('/logout', authentication, controller.logoutCtrl);
router.patch('/', validation(schemaSubscription), controller.subscriptionCtrl);

module.exports = router;
