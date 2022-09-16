const fs = require('fs/promises');
const path = require('path');

const nanoid = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);

  if (!contact) {
    throw new Error('Not found');
  }

  return contact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);

  if (index === -1) {
    throw new Error('Not found');
  }

  const removedContact = contacts.splice(index, 1);
  const contactsStr = JSON.stringify(contacts, null, 2);

  await fs.writeFile(contactsPath, contactsStr, 'utf8');
  return removedContact;
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  const newContactsList = JSON.stringify([...contacts, newContact], null, 2);

  await fs.writeFile(contactsPath, newContactsList, 'utf8');
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);

  if (index === -1) {
    throw new Error('Not found');
  }

  const updatedContact = { contactId, ...body };
  contacts[index] = updatedContact;

  const contactsStr = JSON.stringify(contacts, null, 2);

  await fs.writeFile(contactsPath, contactsStr, 'utf8');
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
