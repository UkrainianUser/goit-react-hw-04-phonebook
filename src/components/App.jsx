import React from "react";
import css from "./App.module.css";
import ContactForm from "./contactForm/ContactForm";
import Filter from "./filter/Filter";
import ContactList from "./contactList/ContactList"
import { nanoid } from 'nanoid';

class App extends React.Component {

  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = (data) => {
    const { name } = data;
    if (this.isNameExist(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: ''
    }));
  };

  handleChangeFilter = (evt) => {
    this.setState({filter: evt.currentTarget.value});
  };

  isNameExist = (name) => {
    return this.state.contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
  }

  deleteContact = (contactId) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  }

  render () {

    const normalizedFilter = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  
    return (
      <div className={css.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.handleChangeFilter} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />
      </div>
    );
  }
};


export default App;