import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import EstoquesTable from './EstoquesTable';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import {
  getEstoques,
  searchEstoqueByLote,
  searchEstoqueByDescricao,
  searchEstoqueByQuantidade,
  searchEstoqueByQuarentena,
  searchEstoqueBySaldoAtual,
  searchEstoqueBySaldoOriginal,
  searchEstoqueByUnidade,
  searchEstoqueByValidade,
} from '../../store/modules/estoques/reducer';
import { VerticalContainer, HorizontalContainer } from '../../config/GlobalStyle';
import convertDate from '../../hooks/convertDate';

function SearchEstoque() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.estoques.status);
  const estoques = convertObjectToArray(useSelector((state) => state.estoques.estoques)) || [];
  const [value, setValue] = useState('');
  const [option, setOption] = useState('Lote');
  const [operador, setOperador] = useState('EqualTo');

  const options = [
    {
      value: 'Lote',
      label: 'Lote',
    },
    {
      value: 'Validade',
      label: 'Validade',
    },
    {
      value: 'Descrição',
      label: 'Descrição',
    },
    {
      value: 'Quantidade',
      label: 'Quantidade',
    },
    {
      value: 'Quarentena',
      label: 'Quarentena',
    },
    {
      value: 'Saldo Atual',
      label: 'Saldo Atual',
    },
    {
      value: 'Saldo Original',
      label: 'Saldo Original',
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

  useEffect(() => {
    dispatch(getEstoques());
  }, [dispatch]);

  const handleSearch = useCallback(() => {
    switch (option) {
      case 'Lote':
        dispatch(searchEstoqueByLote(value));
        break;
      case 'Validade':
        dispatch(searchEstoqueByValidade({ validade: convertDate(value), operador }));
        break;
      case 'Descrição':
        dispatch(searchEstoqueByDescricao(value));
        break;
      case 'Quantidade':
        dispatch(searchEstoqueByQuantidade({ quantidade: value, operador }));
        break;
      case 'Quarentena':
        dispatch(searchEstoqueByQuarentena({ quarentena: value, operador }));
        break;
      case 'Unidade':
        dispatch(searchEstoqueByUnidade(value));
        break;
      case 'Saldo Atual':
        dispatch(searchEstoqueBySaldoAtual({ saldoAtual: value, operador }));
        break;
      case 'Saldo Original':
        dispatch(searchEstoqueBySaldoOriginal({ saldoOriginal: value, operador }));
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
      case 'Validade':
        return 'date';
      case 'Lote':
        return 'text';
      case 'Descrição':
        return 'text';
      case 'Unidade':
        return 'text';
      default:
        return 'number';
    }
  }, []);

  return (
    <VerticalContainer style={{ paddingTop: '2rem' }}>
      <h1>Ver Estoques</h1>
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
        <Button onClick={() => dispatch(getEstoques())} variant="contained" color="error">
          Limpar
        </Button>
      </HorizontalContainer>
      <div style={{ width: '80%', marginBottom: '4rem' }}>
        <EstoquesTable estoques={estoques} isLoading={isLoading} />
      </div>
    </VerticalContainer>
  );
}

export default SearchEstoque;
