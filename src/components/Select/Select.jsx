import PropTypes from 'prop-types';

function Select({ inputRef, options }) {
  return (
    <select ref={inputRef}>
      <option value="None" key="None">-</option>
      {options.map((option) => <option value={option} key={option}>{option}</option>)}
    </select>
  );
}

Select.propTypes = {
  inputRef: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Select;
