import { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const InputType = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
};

function Input({
  keyName,
  keyValue,
  keyType,
  data,
  setData,
}) {
  const [type, setType] = useState(InputType.TEXT);
  useMemo(() => {
    switch (keyType) {
      case InputType.NUMBER:
        setType(InputType.NUMBER);
        break;
      case InputType.DATE:
        setType(InputType.DATE);
        break;
      default:
        setType(InputType.TEXT);
        break;
    }
  }, [keyType]);
  const handleInput = useCallback((e) => {
    setData({
      ...data,
      [keyName]: e.currentTarget.value,
    });
  }, [data, keyName, setData]);
  return (
    <InputContainer>
      <label htmlFor={keyName}>{keyName}</label>
      <input
        type={type}
        defaultValue={keyValue}
        onChange={handleInput}
        placeholder={keyName}
      />
    </InputContainer>
  );
}

Input.propTypes = {
  keyName: PropTypes.string.isRequired,
  keyValue: PropTypes.string.isRequired,
  keyType: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  setData: PropTypes.func.isRequired,
};

export default Input;
