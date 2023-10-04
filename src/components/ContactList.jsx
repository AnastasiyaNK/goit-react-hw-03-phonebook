import React from 'react';
import css from './App.module.css';

export const ContactList = ({ contacts, handleDeleteContact }) => {
  return (
    <ul>
      {contacts.map(contact => {
        return (
          <li className={css.contactItem} key={contact.id}>
            {contact.name}:{contact.number}
            <button
              className={css.deleteBtn}
              onClick={() => handleDeleteContact(contact.id)}
            >
              &times;
            </button>
          </li>
        );
      })}
    </ul>
  );
};
