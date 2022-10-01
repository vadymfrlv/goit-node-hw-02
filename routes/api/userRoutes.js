const express = require('express');
const router = express.Router();

const controller = require('../../controllers/userControllers');
const validation = require('../../middlewares/validation');
const { schema, schemaUpd } = require('../../schemas/userValidationSchema');

router.post('/signup');
router.post('/login');
router.get('/current');
router.patch('/');
router.get('/logout');

module.exports = router;
