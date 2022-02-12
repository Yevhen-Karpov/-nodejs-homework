const { v4 } = require("uuid");
const fs = require("fs").promises;
const contactsPath = require("./filePath");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id == id);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { ...{ name, email, phone }, id: v4() };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }

  contacts[idx] = { ...data, id };
  contacts.push(contacts[idx]);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

const removeById = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id == id);
  if (idx == -1) {
    return null;
  }

  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateById,
  removeById,
};
