import React, { Component } from 'react';

import css from './App.module.css';
import { ContactList } from './ContactList';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handelAddContact = formData => {
    const isInContact = this.state.contacts.some(
      contact => contact.name.toLowerCase() === formData.name
    );

    if (isInContact) {
      return alert(`${formData.name} is already in contacts`);
    }

    const newContact = {
      name: formData.name,
      number: formData.number,
      id: nanoid(),
    };

    this.setState(prevStatet => {
      return {
        contacts: [...prevStatet.contacts, newContact],
      };
    });

    // this.setState({ contacts: [...this.state.contacts, newContact] });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));

    // this.setState({
    //   contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    // });
  };

  handleInputChange = event => {
    this.setState(prevState => ({
      filter: event.target.value,
    }));
  };

  getVisibleContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? [];
    this.setState({
      contacts: parsedContacts,
    });
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  render() {
    const filteredContactsByName = this.getVisibleContacts();

    return (
      <div className={css.phoneBook}>
        <ContactForm handelAddContact={this.handelAddContact} />
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <input
          type="text"
          value={this.state.filter}
          onChange={this.handleInputChange}
        />
        <ContactList
          contacts={filteredContactsByName}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}
