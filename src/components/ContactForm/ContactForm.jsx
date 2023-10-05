import React, { Component } from 'react';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.handelAddContact({ ...this.state });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div className={css.containerForm}>
        <h1 className={css.titltForm}>Phonebook</h1>
        <form className={css.form} onSubmit={this.handleFormSubmit}>
          <label className={css.lebel}>
            Name
            <input
              onChange={this.handleInputChange}
              value={name}
              type="text"
              name="name"
              className={css.input}
              required
            />
          </label>
          <label className={css.lebel}>
            Number
            <input
              onChange={this.handleInputChange}
              value={number}
              type="tel"
              name="number"
              className={css.input}
              required
            />
          </label>
          <button className={css.addBtn}>Add contact</button>
        </form>
      </div>
    );
  }
}
