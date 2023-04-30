import React, { useState, useEffect } from "react";
import css from "./App.module.css";
import ContactForm from "./contactForm/ContactForm";
import Filter from "./filter/Filter";
import ContactList from "./contactList/ContactList"
import { nanoid } from 'nanoid';

export default function App () {

  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);
  const [filter, setFilter] = useState('');

  useEffect (() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      setContacts(contacts);
    }
  }, []);

  useEffect (prevState=>{
    if (prevState !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const formSubmitHandler = (data) => {
    const { name } = data;
    if (isNameExist(name)) {
    alert(`${name} is already in contacts.`);
    return;
    }
    const newContact = {
    id: nanoid(),
    name: data.name,
    number: data.number
    };
    setContacts(prevState => [...prevState, newContact]);
  };

  const handleChangeFilter = (evt) => {
    setFilter(evt.currentTarget.value);
  };

  const isNameExist = (name) => {
    return contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
  }

  const deleteContact = (contactId) => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  }

    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  
    return (
      <div className={css.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ContactList contacts={filteredContacts} onDeleteContact={deleteContact} />
      </div>
    );
};
