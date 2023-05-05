import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './contactForm/ContactForm';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';
import css from './App.module.css';

const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

const CONTACTS = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(CONTACTS);

    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
    } else {
      this.setState({ contacts: initialContacts }); //записуємо початковий масив,
    }
  }

  // Метод життєвого циклу, який викликається після оновлення стейту.
  // _ цей перший аргумент не використовується в коді.
  componentDidUpdate(_, prevState) {
    // якщо контакти змінились, то записуємо їх в localStorage
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        CONTACTS,
        JSON.stringify(this.state.contacts) // перетворюємо масив в JSON
      );
    }
  }

  onChangeInput = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = ({ name, number }) => {
    if (
      this.state.contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      // якщо контакт існує, то показувати повідомлення
      alert(`${name} is already in contacts`);
    } else {
      // додавання нового контакту до списку контактів
      this.setState(oldState => {
        const list = [
          ...oldState.contacts,
          {
            id: nanoid(),
            name: name,
            number: number,
          },
        ];

        return { contacts: list };
      });
    }
  };

  filter = () => {
    const { contacts, filter } = this.state;

    // новий масив, який містить всі контакти, що містять рядок пошуку
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredContacts;
  };

  // отримання параметру id, який потрібно видалити зі списку контактів
  delContact = id => {
    // отримання поточного списку контактів зі стану компонента
    const { contacts } = this.state;

    // Новий масив, який містить всі контакти, окрім того, що має ідентифікатор
    const filtred = contacts.filter(item => item.id !== id);

    // оновлення властивості contacts
    this.setState({ contacts: filtred });
  };

  render() {
    return (
      <div className={css.conteiner}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChangeInput={this.onChangeInput} />
        <ContactList delContact={this.delContact} contacts={this.filter()} />
      </div>
    );
  }
}
