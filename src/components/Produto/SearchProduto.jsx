import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useCallback } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';
import ProdutosTable from './ProdutosTable';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import {
  getProdutos,
  searchProdutoByNome,
  searchProdutoByCodigo,
  searchProdutoByFabricante,
  searchProdutoByPrecoUnitario,
} from '../../store/modules/produtos/reducer';
import { VerticalContainer, HorizontalContainer } from '../../config/GlobalStyle';

function SearchProduto() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.produtos.status);
  const produtos = convertObjectToArray(useSelector((state) => state.produtos.produtos)) || [];
  const [value, setValue] = useState('');
  const [option, setOption] = useState('Nome');
  const [operador, setOperador] = useState('EqualTo');

  useEffect(() => {
    dispatch(getProdutos());
  }, [dispatch]);

  const options = [
    {
      value: 'Nome',
      label: 'Nome',
    },
    {
      value: 'Código',
      label: 'Código',
    },
    {
      value: 'Fabricante',
      label: 'Fabricante',
    },
    {
      value: 'Preço Unitário',
      label: 'Preço Unitário',
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

  const handleInput = useCallback((e) => {
    setValue(e.currentTarget.value);
  }, []);

  const handleSearch = useCallback(() => {
    switch (option) {
      case 'Nome':
        dispatch(searchProdutoByNome(value));
        break;
      case 'Código':
        dispatch(searchProdutoByCodigo(value));
        break;
      case 'Fabricante':
        dispatch(searchProdutoByFabricante(value));
        break;
      case 'Preço Unitário':
        dispatch(searchProdutoByPrecoUnitario({ precoUnitario: value, operador }));
        break;
      default:
        break;
    }
  }, [option, dispatch, value, operador]);

  return (
    <VerticalContainer style={{ paddingTop: '2rem' }}>
      <h1>Ver Produtos</h1>
      <HorizontalContainer>
        <TextField
          id="outlined-select-option"
          select
          label="Opção"
          defaultValue="Nome"
          onChange={(e) => setOption(e.target.value)}
        >
          {options.map((optionItem) => (
            <MenuItem key={optionItem.value} value={optionItem.value}>
              {optionItem.label}
            </MenuItem>
          ))}
        </TextField>
        {option === 'Preço Unitário'
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
          type={option === 'Preço Unitário' ? 'number' : 'search'}
          // Avoid negative values (input type number)
          inputProps={{ min: 0 }}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ width: 400 }}
        />
        <Button onClick={handleSearch} variant="contained">
          Buscar
        </Button>
        <Button onClick={() => dispatch(getProdutos())} variant="contained" color="error">
          Limpar
        </Button>
      </HorizontalContainer>
      <div style={{ width: '80%', marginBottom: '4rem' }}>
        <ProdutosTable produtos={produtos} isLoading={isLoading} />
      </div>
    </VerticalContainer>
  );
}

export default SearchProduto;
