import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export function ContactForm({ contacts, addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isContactExists = contacts.some((contact) => contact.name === name);

    if (isContactExists) {
      alert(`${name} is already in contacts`);
    } else {
      addContact(name, number);
    }

    setName('');
    setNumber('');
  };

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.nameInput}>
          <label htmlFor={nameInputId} className={css.label}>
            Name
          </label>
          <input
            id={nameInputId}
            type="text"
            autoComplete="off"
            name="name"
            value={name}
            onChange={handleInputChange}
            pattern="^[a-zA-Z\s]+$"
            title="Name may contain only latin letters"
            required
            className={css.input}
          />
        </div>
        <div className={css.numberInput}>
          <label htmlFor={numberInputId} className={css.label}>
            Number
          </label>
          <input
            id={numberInputId}
            type="tel"
            name="number"
            value={number}
            onChange={handleInputChange}
            pattern="^\d{3}-\d{2}-\d{2}$"
            title="The phone number should look like this: 012-34-56"
            required
            className={css.input}
          />
        </div>

        <button type="submit" className={css.btnAddContact}>
          Add contact
        </button>
      </form>
    </div>
  );
}

ContactForm.propTypes = {
  contacts: PropTypes.array.isRequired,
  addContact: PropTypes.func.isRequired,
};