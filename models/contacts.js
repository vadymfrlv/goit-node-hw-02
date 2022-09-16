const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);

  if (!contact) {
    throw new Error(`Could not find contact with id ${contactId}`);
  }

  return contact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);

  if (!contact) {
    throw new Error(`Could not find contact with id ${contact}`);
  }
};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
