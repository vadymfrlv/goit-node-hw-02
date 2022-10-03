const Service = require('../services/contactsService');

const getContactsCtrl = async (req, res, next) => {
  const { userId } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  try {
    const contacts = favorite
      ? await Service.filterFavoriteContacts({ owner: userId, favorite })
      : await Service.getContacts({ owner: userId, limit, skip, favorite });
    res.status(200).json({ contacts: contacts, total: contacts.length, page, limit });
  } catch (error) {
    next(error);
  }
};

const getContactByIdCtrl = async (req, res, next) => {
  const { contactId } = req.params;
  const { userId: owner } = req.user;

  try {
    const contact = await Service.getContactById(contactId, owner);

    if (!contact) {
      throw new Error('Sorry, no contacts added yet');
    }

    res.status(200).json({ contact });
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
};

const addContactCtrl = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const { userId: owner } = req.user;

  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'Missing required name field' });
    return;
  }

  try {
    const newContact = await Service.addContact({ name, email, phone, favorite }, owner);
    res.status(201).json({ newContact });
  } catch (error) {
    next(error);
  }
};

const removeContactCtrl = async (req, res, next) => {
  const { contactId } = req.params;
  const { userId: owner } = req.user;

  try {
    const contact = await Service.removeContact(contactId, owner);

    if (!contact) {
      throw new Error('Not found');
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateContactCtrl = async (req, res, next) => {
  const { contactId } = req.params;
  const { userId: owner } = req.user;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: 'Missing fields' });
      return;
    }

    const putContact = await Service.updateContact(contactId, body, owner);
    res.status(200).json({ putContact });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const favoriteContactCtrl = async (req, res, next) => {
  const { contactId } = req.params;
  const { userId: owner } = req.user;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: 'Missing field favorite' });
      return;
    }

    const updContact = await Service.updateStatusContact(contactId, body, owner);
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
