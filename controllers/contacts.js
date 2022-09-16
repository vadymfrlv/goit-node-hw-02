const nanoid = require('nanoid');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../models/contacts');

const listContactsCtrl = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactByIdCtrl = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const contact = await getContactById(id);
    return res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addContactCtrl = async (req, res, next) => {
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: 'missing required name field' });
      return;
    }
    const newContact = await addContact({ id: nanoid(), ...body });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeContactCtrl = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    await removeContact(id);
    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateContactCtrl = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: 'missing fields' });
      return;
    }
    const putContact = await updateContact(id, body);
    res.status(200).json(putContact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  listContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
};
