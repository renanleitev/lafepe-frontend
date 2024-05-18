import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { StyledContainer, Form } from '../../config/GlobalStyle';
import Input, { InputType } from '../Input/Input';
import { deleteProduto } from '../../store/modules/produtos/reducer';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import convertOptions from '../../hooks/convertOptions';

function DeleteProduto() {
  const dispatch = useDispatch();

  const [produto, setProduto] = useState();

  const produtos = convertObjectToArray(useSelector((state) => state.produtos.produtos)) || [];

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    dispatch(deleteProduto({ ...produto }));
  }, [dispatch, produto]);

  return (
    <StyledContainer>
      <h1>Apagar Produto</h1>
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
      {produto
      && (
      <Form onSubmit={handleSubmit}>
        <Input
          data={produto}
          setData={setProduto}
          label="Código"
          keyName="codigo"
          disabled
        />
        <Input
          data={produto}
          setData={setProduto}
          label="Nome"
          keyName="nome"
          disabled
        />
        <Input
          data={produto}
          setData={setProduto}
          label="Fabricante"
          keyName="fabricante"
          disabled
        />
        <Input
          data={produto}
          setData={setProduto}
          label="Preço Unitário"
          keyName="precoUnitario"
          keyType={InputType.NUMBER}
          disabled
        />
        <button type="submit">APAGAR</button>
      </Form>
      )}
    </StyledContainer>
  );
}
export default DeleteProduto;
