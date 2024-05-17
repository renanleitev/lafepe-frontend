import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styled from 'styled-components';
import { Form } from '../../config/GlobalStyle';
import Input from '../Input/Input';
import { deleteProduto } from '../../store/modules/produtos/reducer';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import convertOptions from '../../hooks/convertOptions';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

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
        disablePortal
        id="search-produto"
        onChange={(event, value) => setProduto(value.item)}
        options={convertOptions(produtos)}
        sx={{ width: 300 }}
      // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Produtos" />}
      />
      {produto
      && (
      <Form onSubmit={handleSubmit}>
        <Input data={produto} setData={setProduto} keyName="Código" keyType="text" keyValue={produto.codigo} />
        <Input data={produto} setData={setProduto} keyName="Nome" keyType="text" keyValue={produto.nome} />
        <Input data={produto} setData={setProduto} keyName="Fabricante" keyType="text" keyValue={produto.fabricante} />
        <Input data={produto} setData={setProduto} keyName="Preço Unitário" keyType="number" keyValue={produto.precoUnitario} />
        <button type="submit">APAGAR</button>
      </Form>
      )}
    </StyledContainer>
  );
}
export default DeleteProduto;
