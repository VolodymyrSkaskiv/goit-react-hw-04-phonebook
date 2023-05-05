import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, delContact }) => {
  return (
    <ul className={css.list}>
      {/* Проходження по кожному контакту та повернення нового масиву з елементами списку */}
      {contacts.map(contact => {
        return (
          <li className={css.item} key={contact.id}>
            <span>{contact.name}:</span>
            <span className={css.number}>{contact.number}</span>
            <button
              className={css.button}
              type="button"
              // Функція delContact в яку передається contact.id для видалення контакту зі списку.
              onClick={() => {
                delContact(contact.id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  delContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
