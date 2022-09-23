const Contacts = require('../models/contactsModel');

const getContacts = async () => {
  return Contacts.find();
};

const getContactById = async contactId => {
  return Contacts.findById(contactId);
};

const addContact = async body => {
  return Contacts.create({ ...body });
};

const removeContact = async contactId => {
  return Contacts.findByIdAndRemove(contactId);
};

const updateContact = async (contactId, body) => {
  return Contacts.findByIdAndUpdate(contactId, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  return Contacts.findByIdAndUpdate(contactId, body, { new: true });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
