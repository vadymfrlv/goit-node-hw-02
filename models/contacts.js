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
    throw new Error('Could not find this contact');
  }

  return contact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);

  if (index === -1) {
    throw new Error('Could not find this contact');
  }

  const removedContact = contacts.splice(index, 1);
  const contactsStr = JSON.stringify(contacts, null, 2);

  await fs.writeFile(contactsPath, contactsStr, 'utf8');
  return removedContact;
};

const addContact = async body => {
  const contacts = await listContacts();
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
