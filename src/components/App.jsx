import React, { useState, useEffect } from "react";
import css from "./App.module.css";
import ContactForm from "./contactForm/ContactForm";
import Filter from "./filter/Filter";
import ContactList from "./contactList/ContactList"
import { nanoid } from 'nanoid';

export default function App () {

  const [contacts, setContacts] = useState(()=>JSON.parse(localStorage.getItem('contacts')) ?? [ ]);
  const [filter, setFilter] = useState('');

  useEffect (()=>{
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (data) => {
    const { name, number } = data;
    if (isNameExist(name)) {
    alert(`${name} is already in contacts.`);
    return;
    }
    if (isNumberExist(number)) {
      alert(`Number ${number} is already in contacts.`);
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

  const isNumberExist = (number) => {
    return contacts.some(contact => contact.number === number);
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
