import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ filter, onChangeInput }) => {
  return (
    <>
      <label>
        Find contacts by name
        <br />
        <input
          className={css.input}
          onChange={onChangeInput}
          value={filter}
          type="text"
          name="filter"
        />
      </label>
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};
