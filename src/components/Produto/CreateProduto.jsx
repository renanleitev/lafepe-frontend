import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledContainer, Form } from '../../config/GlobalStyle';
import Input, { InputType } from '../Input/Input';
import { createProduto, initialProduto } from '../../store/modules/produtos/reducer';
import validationObject from '../../hooks/validationObject';

function CreateProduto() {
  const dispatch = useDispatch();

  const [produto, setProduto] = useState(initialProduto);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const error = validationObject(produto);
    if (!error) {
      dispatch(createProduto({ ...produto }));
    }
  }, [dispatch, produto]);

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Criar Produto</h1>
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
        <button type="submit">CRIAR</button>
      </Form>
    </StyledContainer>
  );
}
export default CreateProduto;
