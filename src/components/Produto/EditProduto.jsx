import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { StyledContainer, Form, HorizontalContainer } from '../../config/GlobalStyle';
import Input, { InputType } from '../Input/Input';
import { editProduto, getProdutos } from '../../store/modules/produtos/reducer';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import convertOptions from '../../hooks/convertOptions';
import validationObject from '../../hooks/validationObject';

function EditProduto() {
  const dispatch = useDispatch();

  const [produto, setProduto] = useState();
  const [option, setOption] = useState('nome');

  const produtos = convertObjectToArray(useSelector((state) => state.produtos.produtos)) || [];

  useEffect(() => {
    dispatch(getProdutos());
  }, [dispatch]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const error = validationObject(produto);
    if (!error) {
      dispatch(editProduto({ ...produto }));
    }
  }, [dispatch, produto]);

  const handleOption = useCallback((event) => {
    setOption(event.target.value);
  }, []);

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Editar Produto</h1>
        <HorizontalContainer>
          <FormControl>
            <RadioGroup
              aria-labelledby="editar-produto-label-options"
              defaultValue="nome"
              name="radio-buttons-group"
            >
              <FormControlLabel value="nome" control={<Radio />} onChange={handleOption} label="Nome" />
              <FormControlLabel value="codigo" control={<Radio />} onChange={handleOption} label="Código" />
            </RadioGroup>
          </FormControl>
          <Autocomplete
            freeSolo
            disablePortal
            id="search-produto"
            onChange={(event, value) => setProduto(value?.item)}
            options={convertOptions(produtos, option)}
            sx={{ width: 400 }}
            disabled={produtos.length === 0}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} label="Produtos" />}
          />
          <button type="submit">EDITAR</button>
        </HorizontalContainer>
        {produto
      && (
        <>
          <Input
            data={produto}
            setData={setProduto}
            label="Código"
            keyName="codigo"
            inputWidth={630}
          />
          <Input
            data={produto}
            setData={setProduto}
            label="Nome"
            keyName="nome"
            inputWidth={630}
          />
          <Input
            data={produto}
            setData={setProduto}
            label="Fabricante"
            keyName="fabricante"
            inputWidth={630}
          />
          <Input
            data={produto}
            setData={setProduto}
            label="Preço Unitário"
            keyName="precoUnitario"
            keyType={InputType.NUMBER}
            inputWidth={630}
          />
        </>
      )}
      </Form>
    </StyledContainer>
  );
}
export default EditProduto;
