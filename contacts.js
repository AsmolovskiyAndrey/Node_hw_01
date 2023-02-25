const path = require("path");
const fs = require("fs").promises;
const uniqid = require("uniqid");

const contactsPath = path.resolve("contacts.json");

async function listContacts() {
  const list = await fs.readFile("db/contacts.json");
  return JSON.parse(list);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contactById = data.find(({ id }) => id === contactId);
  return contactById;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const deleteContactById = data.filter(({ id }) => !(id === contactId));
  fs.writeFile("db/contacts.json", JSON.stringify(deleteContactById));
  console.log(`Contact with id ${contactId} was deleted successfully`);
}

async function addContact(name, email, phone) {
  const newContact = {
    id: uniqid(),
    name,
    email,
    phone,
  };
  const data = await listContacts();
  const newData = [...data, newContact];
  await fs.writeFile("db/contacts.json", JSON.stringify(newData));
  console.log("Contact added successfully ");
}

module.exports = { listContacts, addContact, removeContact, getContactById };
