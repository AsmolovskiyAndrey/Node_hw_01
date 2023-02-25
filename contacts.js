// const path = require("path");
const path = require("path");
const fs = require("fs").promises;
const uniqid = require("uniqid");

const contactsPath = path.resolve("contacts.json");

console.log(contactsPath);

// TODO: задокументировать каждую функцию
async function listContacts() {
  const list = await fs.readFile("db/contacts.json");
  // console.log(JSON.parse(list));
  return JSON.parse(list);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contactById = data.find(({ id }) => id === contactId);
  // console.log(contactById);
}
// getContactById("3");

async function removeContact(contactId) {
  const data = await listContacts();
  const deleteContactById = data.filter(({ id }) => !(id === contactId));
  // console.log(deleteContactById);
  fs.writeFile("db/contacts.json", JSON.stringify(deleteContactById));
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
  console.log(data);
}

addContact("hjh", "asd", 456);
