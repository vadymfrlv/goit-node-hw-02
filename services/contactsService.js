const Contact = require('../models');

const getContacts = async () => {
  return Contact.find();
};
const getContactById = async contactId => {
  return Contact.findOne({ _id: contactId });
};
const addContact = async body => {
  return Contact.create({ ...body });
};
const removeContact = async contactId => {
  return Contact.findByIdAndRemove({ _id: contactId });
};
const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body);
};
const updateStatusContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body);
};
module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
