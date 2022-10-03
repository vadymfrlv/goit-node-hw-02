const Contacts = require('../models/contactsModel');

const getContacts = async ({ owner, limit, skip }) => {
  return Contacts.find({ owner }, '-createdAt -updatedAt')
    .limit(limit)
    .skip(skip)
    .populate('owner', 'name email subscription -_id');
};

const getContactById = async (contactId, owner) => {
  return Contacts.findById({ _id: contactId, owner }, '-_id');
};

const addContact = async ({ name, email, phone, favorite }, owner) => {
  return Contacts.create({ name, email, phone, favorite, owner });
};

const removeContact = async (contactId, owner) => {
  return Contacts.findByIdAndRemove({ _id: contactId, owner });
};

const updateContact = async (contactId, body, owner) => {
  return Contacts.findByIdAndUpdate({ _id: contactId, owner }, body, { new: true });
};

const updateStatusContact = async (contactId, body, owner) => {
  const { favorite } = body;
  return Contacts.findByIdAndUpdate(
    { _id: contactId, owner },
    { $set: { favorite } },
    { new: true }
  );
};

const filterFavoriteContacts = async ({ userId, favorite }) => {
  return Contacts.find({ owner: userId, favorite }, '', {}).populate('owner', '_id email');
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
  filterFavoriteContacts,
};
