const Contacts = require('../models/contactsModel');

const getContacts = async ({ owner, limit, skip, favorite }) => {
  return Contacts.find(favorite ? { owner, favorite } : { owner }, '-createdAt -updatedAt')
    .limit(limit)
    .skip(skip)
    .populate('owner', 'email subscription -_id');
};

const getContactById = async ({ contactId, owner }) => {
  return Contacts.findById({ contactId, owner });
};

const addContact = async ({ body, owner }) => {
  return Contacts.create({ ...body, owner });
};

const removeContact = async (contactId, owner) => {
  return Contacts.findByIdAndRemove(contactId, owner);
};

const updateContact = async (contactId, body, owner) => {
  return Contacts.findByIdAndUpdate({ contactId, owner }, body, { new: true });
};

const updateStatusContact = async (contactId, body, owner) => {
  return Contacts.findByIdAndUpdate({ contactId, owner }, body, { new: true });
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
