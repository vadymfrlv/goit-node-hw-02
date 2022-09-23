const service = require('../services/contactsService');

const getContactsCtrl = async (req, res, next) => {
  try {
    const contacts = await service.getContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactByIdCtrl = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const contact = await service.getContactById(id);
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
    const newContact = await service.addContact(body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeContactCtrl = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    await service.removeContact(id);
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
    const putContact = await service.updateContact(id, body);
    res.status(200).json(putContact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const favoriteContactCtrl = async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: 'missing field favorite' });
      return;
    }
    const updContact = await service.updateStatusContact(id, body);
    res.status(200).json({ updContact });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = {
  getContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  removeContactCtrl,
  updateContactCtrl,
  favoriteContactCtrl,
};
