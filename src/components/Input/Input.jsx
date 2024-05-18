import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

// eslint-disable-next-line react-refresh/only-export-components
export const InputType = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  TEXTAREA: 'textarea',
};

function Input({
  label,
  keyName,
  keyType,
  data,
  setData,
  disabled,
}) {
  const handleInput = useCallback((e) => {
    setData({
      ...data,
      [keyName]: e.currentTarget.value,
    });
  }, [data, keyName, setData]);

  const isError = () => {
    if (typeof data[keyName] === 'string' && data[keyName] === '') {
      return true;
    } if (typeof data[keyName] === 'number' && data[keyName] === 0) {
      return true;
    }
    return false;
  };
  const error = isError();
  const errorText = `${label} não pode ser vazio`;

  return (
    <TextField
      type={keyType}
      label={label}
      value={data[keyName]}
      onChange={handleInput}
      placeholder={label}
      disabled={disabled}
      // Fix label on top of input
      InputLabelProps={{ shrink: true }}
      // Textarea
      multiline={keyType === InputType.TEXTAREA}
      rows={2}
      // Style
      fullWidth
      sx={{ width: 400 }}
      // Avoid negative values (input type number)
      inputProps={{ min: 0 }}
      // Error text
      error={error}
      helperText={error && errorText}
    />
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  keyName: PropTypes.string.isRequired,
  keyType: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ])).isRequired,
  setData: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  disabled: false,
  keyType: InputType.TEXT,
};

export default Input;
