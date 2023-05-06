import { useState, useEffect } from 'react';
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

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem(CONTACTS)) ?? initialContacts // беремо контакти з localStorage, якщо немає, то використовуємо initialContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const onChangeInput = evt => {
    setFilter(evt.currentTarget.value);
  };

  const addContact = ({ name, number }) => {
    if (
      contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      // якщо контакт існує, то показувати повідомлення
      alert(`${name} is already in contacts`);
    } else {
      // додавання нового контакту до списку контактів
      setContacts(preContacts => {
        const list = [
          ...preContacts,
          {
            id: nanoid(),
            name: name,
            number: number,
          },
        ];

        return list;
      });
    }
  };

  // функція для фільтрації контактів
  const filterFn = () => {
    // фільтруємо масив контактів по значенню фільтра
    const filteredContacts = contacts.filter(
      contact => contact.name.toLowerCase().includes(filter.toLowerCase()) // перевіряємо чи є в імені контакту введене значення фільтра
    );
    return filteredContacts;
  };

  // функція для видалення контакту
  const delContact = id => {
    const filtred = contacts.filter(item => item.id !== id); // фільтруємо масив контактів по ідентифікатору
    setContacts(filtred); // змінюємо стан масиву контактів
  };

  return (
    <div className={css.conteiner}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChangeInput={onChangeInput} />
      <ContactList delContact={delContact} contacts={filterFn()} />
    </div>
  );
};
