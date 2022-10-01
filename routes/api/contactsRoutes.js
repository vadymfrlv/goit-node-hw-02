const express = require('express');
const router = express.Router();

const controller = require('../../controllers/contactControllers');
const validation = require('../../middlewares/validation');
const authentication = require('../../middlewares/authentication');
const { schema, schemaUpd } = require('../../schemas/contactsValidationSchema');

router.get('/', authentication, controller.getContactsCtrl);
router.get('/:contactId', controller.getContactByIdCtrl);
router.post('/', validation(schema), controller.addContactCtrl);
router.delete('/:contactId', controller.removeContactCtrl);
router.put('/:contactId', validation(schema), controller.updateContactCtrl);
router.patch('/:contactId/favorite', validation(schemaUpd), controller.favoriteContactCtrl);

module.exports = router;
