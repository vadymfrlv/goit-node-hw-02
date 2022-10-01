const express = require('express');
const router = express.Router();

const controller = require('../../controllers/userControllers');
const validation = require('../../middlewares/validation');
const { schema, schemaSubscription } = require('../../schemas/userValidationSchema');

router.post('/signup', validation(schema));
router.post('/login', validation(schema));
router.get('/current');
router.get('/logout');
router.patch('/', validation(schemaSubscription));

module.exports = router;
