import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { StyledContainer, Form, HorizontalContainer } from '../../config/GlobalStyle';
import Input, { InputType } from '../Input/Input';
import { createEstoque, initialEstoque } from '../../store/modules/estoques/reducer';
import { getProdutos } from '../../store/modules/produtos/reducer';
import convertOptions from '../../hooks/convertOptions';

function CreateEstoque() {
  const dispatch = useDispatch();

  const [estoque, setEstoque] = useState(initialEstoque);
  const [produto, setProduto] = useState();
  const produtos = useSelector((state) => state.produtos.produtos) || [];

  useEffect(() => {
    dispatch(getProdutos());
  }, [dispatch]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    dispatch(createEstoque({ ...estoque, produto }));
  }, [dispatch, estoque, produto]);

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Criar Estoque</h1>
        <HorizontalContainer>
          <Autocomplete
            freeSolo
            disablePortal
            id="search-produto"
            onChange={(event, value) => setProduto(value?.item)}
            options={convertOptions(produtos, 'nome')}
            sx={{ width: 400 }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} label="Produto" />}
            disabled={produtos.length === 0}
          />
          <button type="submit">CRIAR</button>
        </HorizontalContainer>
        {produto
        && (
        <>
          <Input
            data={estoque}
            setData={setEstoque}
            label="Lote"
            keyName="lote"
          />
          <Input
            data={estoque}
            setData={setEstoque}
            label="Quantidade"
            keyName="quantidade"
            keyType={InputType.NUMBER}
          />
          <Input
            data={estoque}
            setData={setEstoque}
            label="Quarentena"
            keyName="quarentena"
            keyType={InputType.NUMBER}
          />
          <Input
            data={estoque}
            setData={setEstoque}
            label="Validade"
            keyName="validade"
            keyType={InputType.DATE}
          />
          <Input
            data={estoque}
            setData={setEstoque}
            label="Descrição"
            keyName="descricao"
            keyType={InputType.TEXTAREA}
          />
        </>
        )}
      </Form>
    </StyledContainer>
  );
}
export default CreateEstoque;
