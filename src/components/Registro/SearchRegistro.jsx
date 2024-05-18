import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import RegistrosTable from './RegistrosTable';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import {
  getRegistros,
  searchRegistroByData,
  getRegistroByEstoqueLote,
} from '../../store/modules/registros/reducer';
import { VerticalContainer, HorizontalContainer } from '../../config/GlobalStyle';
import convertDate from '../../hooks/convertDate';

function SearchRegistro() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.registros.status);
  const registros = convertObjectToArray(useSelector((state) => state.registros.registros)) || [];
  const [value, setValue] = useState('');
  const [option, setOption] = useState('Lote');
  const [operador, setOperador] = useState('EqualTo');

  useEffect(() => {
    dispatch(getRegistros());
  }, [dispatch]);

  const options = [
    {
      value: 'Data',
      label: 'Data',
    },
    {
      value: 'Lote',
      label: 'Lote',
    },
  ];

  const operadorOptions = [
    {
      value: 'EqualTo',
      label: 'Igual',
    },
    {
      value: 'LessThan',
      label: 'Menor que',
    },
    {
      value: 'LessThanOrEqualTo',
      label: 'Menor ou igual que',
    },
    {
      value: 'GreaterThan',
      label: 'Maior que',
    },
    {
      value: 'GreaterThanOrEqualTo',
      label: 'Maior ou igual que',
    },
  ];

  const handleSearch = useCallback(() => {
    switch (option) {
      case 'Data':
        dispatch(searchRegistroByData({ data: convertDate(value), operador }));
        break;
      case 'Lote':
        dispatch(getRegistroByEstoqueLote(value));
        break;
      default:
        break;
    }
  }, [option, dispatch, value, operador]);

  const handleInput = useCallback((e) => {
    setValue(e.currentTarget.value);
  }, []);

  const changeInputType = useCallback((optionItem) => {
    switch (optionItem) {
      case 'Data':
        return 'date';
      case 'Lote':
        return 'text';
      default:
        return 'number';
    }
  }, []);

  return (
    <VerticalContainer style={{ paddingTop: '2rem' }}>
      <h1>Ver Registros</h1>
      <HorizontalContainer>
        <TextField
          id="outlined-select-option"
          select
          label="Opção"
          defaultValue="Lote"
          onChange={(e) => setOption(e.target.value)}
        >
          {options.map((optionItem) => (
            <MenuItem key={optionItem.value} value={optionItem.value}>
              {optionItem.label}
            </MenuItem>
          ))}
        </TextField>
        {(changeInputType(option) === 'number' || changeInputType(option) === 'date')
        && (
        <TextField
          id="outlined-select-operador-option"
          select
          label="Operador"
          defaultValue="EqualTo"
          onChange={(e) => setOperador(e.target.value)}
        >
          {operadorOptions.map((operadorItem) => (
            <MenuItem key={operadorItem.value} value={operadorItem.value}>
              {operadorItem.label}
            </MenuItem>
          ))}
        </TextField>
        )}
        <TextField
          id="outlined-select-search-value"
          label={option}
          onChange={handleInput}
          placeholder={option}
          type={changeInputType(option)}
          // Avoid negative values (input type number)
          inputProps={{ min: 0 }}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ width: 400 }}
        />
        <Button onClick={handleSearch} variant="contained">
          Buscar
        </Button>
        <Button onClick={() => dispatch(getRegistros())} variant="contained" color="error">
          Limpar
        </Button>
      </HorizontalContainer>
      <div style={{ width: '80%', marginBottom: '4rem' }}>
        <RegistrosTable registros={registros} isLoading={isLoading} />
      </div>
    </VerticalContainer>
  );
}

export default SearchRegistro;
