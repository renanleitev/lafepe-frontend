import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { StyledContainer, Form, HorizontalContainer } from '../../config/GlobalStyle';
import Input, { InputType } from '../Input/Input';
import { editProduto, getProdutos } from '../../store/modules/produtos/reducer';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import convertOptions from '../../hooks/convertOptions';
import validationObject from '../../hooks/validationObject';

function EditProduto() {
  const dispatch = useDispatch();

  const [produto, setProduto] = useState();

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

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Editar Produto</h1>
        <HorizontalContainer>
          <Autocomplete
            freeSolo
            disablePortal
            id="search-produto"
            onChange={(event, value) => setProduto(value?.item)}
            options={convertOptions(produtos, 'nome')}
            sx={{ width: 400 }}
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
          />
          <Input
            data={produto}
            setData={setProduto}
            label="Nome"
            keyName="nome"
          />
          <Input
            data={produto}
            setData={setProduto}
            label="Fabricante"
            keyName="fabricante"
          />
          <Input
            data={produto}
            setData={setProduto}
            label="Preço Unitário"
            keyName="precoUnitario"
            keyType={InputType.NUMBER}
          />
        </>
      )}
      </Form>
    </StyledContainer>
  );
}
export default EditProduto;
