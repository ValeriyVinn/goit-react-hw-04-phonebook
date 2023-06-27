import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const LS_KEY = 'contacts';

export const App = () => {
  const savedContacts = JSON.parse(localStorage.getItem(LS_KEY));

  const [contacts, setContacts] = useState(
    savedContacts && savedContacts.length !== 0
      ? savedContacts
      : [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ]
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const isContactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExists) {
      alert(`${name} is already in contacts, sorry`);
    } else {
      setContacts(prevContacts => [
        ...prevContacts,
        { id: nanoid(), name, number },
      ]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filterContact = e => {
    setFilter(e.target.value);
  };

  return (
    <div className="main">
      <h2>Phonebook</h2>
      <ContactForm contacts={contacts} addContact={addContact} />
      <Filter filter={filterContact} value={filter} />
      <ContactList
        contacts={contacts}
        filter={filter}
        deleteContact={deleteContact}
      />
    </div>
  );
};