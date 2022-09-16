const express = require('express');
const router = express.Router();

const {
  listContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
} = require('../../controllers/contacts');

router.get('/', listContactsCtrl);

router.get('/:contactId', getContactByIdCtrl);

//! schema add
router.post('/', addContactCtrl);

router.delete('/:contactId', removeContactCtrl);

//! schema add
router.put('/:contactId', updateContactCtrl);

module.exports = router;
