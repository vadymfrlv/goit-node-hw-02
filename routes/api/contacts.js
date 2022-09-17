const express = require('express');
const router = express.Router();

const {
  listContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
} = require('../../controllers/contacts');

const validation = require('../../middlewares/validation');
const schema = require('../../schemas/contactValidationSchema');

router.get('/', listContactsCtrl);
router.get('/:contactId', getContactByIdCtrl);
router.post('/', validation(schema), addContactCtrl);
router.delete('/:contactId', removeContactCtrl);
router.put('/:contactId', validation(schema), updateContactCtrl);

module.exports = router;
