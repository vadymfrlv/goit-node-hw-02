const Service = require('../services/contactsService');

const getContactsCtrl = async (req, res, next) => {
  const { userId } = req.user;
  const { page, limit, favorite } = req.query;
  const skip = parseInt(page) > 1 ? (page - 1) * limit : 0;

  try {
    const contacts = await Service.getContacts({ owner: userId, limit, skip, favorite });
    res.status(200).json({ data: contacts, amount: contacts.length, page, limit });
  } catch (error) {
    next(error);
  }
};

const getContactByIdCtrl = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const contact = await Service.getContactById({ contactId: req.params.id, owner: userId });

    if (!contact) {
      throw new Error('Sorry, no contacts added yet');
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: 'Not found' });
  }
};

const addContactCtrl = async (req, res, next) => {
  const { userId } = req.user;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: 'Missing required name field' });
      return;
    }
    const newContact = await Service.addContact({ ...body, owner: userId });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const removeContactCtrl = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const contact = await Service.removeContact({ contactId: req.params.id, owner: userId });

    if (!contact) {
      throw new Error('Not found');
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateContactCtrl = async (req, res, next) => {
  const owner = req.user.id;
  const id = req.params.contactId;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: 'Missing fields' });
      return;
    }

    const putContact = await Service.updateContact(id, body, owner);
    res.status(200).json(putContact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const favoriteContactCtrl = async (req, res, next) => {
  const owner = req.user.id;
  const id = req.params.contactId;
  const body = req.body;

  try {
    if (Object.keys(body).length === 0) {
      res.status(400).json({ message: 'Missing field favorite' });
      return;
    }

    const updContact = await Service.updateStatusContact(id, body, owner);
    res.status(200).json(updContact);
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
