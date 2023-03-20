import React from "react";
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import ContactElem from "./ContactElem/ContactElem";
import ContactForm from './ContactForm/ContactForm';
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

const LOCALSTORAGE_KEY = "contacts";
class App extends React.Component {    
    state = {
      contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }
  
  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
    if (contacts) this.setState({contacts})    
  }

  componentDidUpdate(_, nextState) { 
    if (nextState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.state.contacts))
    }    
  }
  
  addContact = event => {
    event.preventDefault();

    const form = event.target;
    const { name, number } = form.elements;

    const contact = {
      name: name.value,
      number: number.value,
      id: nanoid(),
    };

    if (this.state.contacts.find(contact => contact.name.toLowerCase() === name.value.toLowerCase())) {
      alert(        
        'The contact already exists with this name',        
      );
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
    form.reset();
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  inputFilter = (event) => {
    this.setState({ filter: event.target.value });
  };

  visibleContact = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
  }
    
  render() {  
    const { filter, contacts } = this.state;
    const filterContact = this.visibleContact();
    return (
      <>
        <ContactElem title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </ContactElem>
        <ContactElem title="Contacts">
          {contacts.length > 1 &&
            (<Filter value={filter} onChange={this.inputFilter} />)
          }
          {contacts.length > 0 ? (<ContactList contacts={filterContact} deleteContact={this.deleteContact} />) :
            (Notiflix.Notify.warning('Contact book is empty!'))
          }                    
        </ContactElem>
      </>
      );
    }
  };


export default App;