import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { StyledContainer, Form, HorizontalContainer } from '../../config/GlobalStyle';
import Input, { InputType } from '../Input/Input';
import { editEstoque } from '../../store/modules/estoques/reducer';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import convertOptions from '../../hooks/convertOptions';

function EditEstoque() {
  const dispatch = useDispatch();

  const [estoque, setEstoque] = useState();

  const estoques = convertObjectToArray(useSelector((state) => state.estoques.estoques)) || [];

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    dispatch(editEstoque({ ...estoque }));
  }, [dispatch, estoque]);

  return (
    <StyledContainer>
      <h1>Editar Estoque</h1>
      <HorizontalContainer>
        <Autocomplete
          freeSolo
          disablePortal
          id="search-estoque"
          onChange={(event, value) => setEstoque(value?.item)}
          options={convertOptions(estoques, 'lote')}
          sx={{ width: 400 }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} label="Lote" />}
          disabled={estoques.length === 0}
        />
        <button type="submit">EDITAR</button>
      </HorizontalContainer>
      {estoque
      && (
      <Form onSubmit={handleSubmit}>
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
      </Form>
      )}
    </StyledContainer>
  );
}
export default EditEstoque;
