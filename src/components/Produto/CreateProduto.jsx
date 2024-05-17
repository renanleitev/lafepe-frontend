import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form } from '../../config/GlobalStyle';
import Input from '../Input/Input';
import { createProduto, initialProduto } from '../../store/modules/produtos/reducer';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

function CreateProduto() {
  const dispatch = useDispatch();
  const [produto, setProduto] = useState(initialProduto);
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    dispatch(createProduto({ ...produto }));
  }, [dispatch, produto]);
  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Criar Produto</h1>
        <Input data={produto} setData={setProduto} keyName="Código" keyType="text" keyValue={produto.codigo} />
        <Input data={produto} setData={setProduto} keyName="Nome" keyType="text" keyValue={produto.nome} />
        <Input data={produto} setData={setProduto} keyName="Fabricante" keyType="text" keyValue={produto.fabricante} />
        <Input data={produto} setData={setProduto} keyName="Preço Unitário" keyType="number" keyValue={produto.precoUnitario} />
        <button type="submit">CRIAR</button>
      </Form>
    </StyledContainer>
  );
}
export default CreateProduto;
