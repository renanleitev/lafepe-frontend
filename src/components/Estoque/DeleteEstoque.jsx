import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { toast } from 'react-toastify';
import { StyledContainer, Form, HorizontalContainer } from '../../config/GlobalStyle';
import Input, { InputType } from '../Input/Input';
import { deleteEstoque } from '../../store/modules/estoques/reducer';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import convertOptions from '../../hooks/convertOptions';

function DeleteEstoque() {
  const dispatch = useDispatch();

  const [estoque, setEstoque] = useState();
  const [confirm, setConfirm] = useState(false);

  const estoques = convertObjectToArray(useSelector((state) => state.estoques.estoques)) || [];

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (!confirm) {
      setConfirm(true);
      toast.warn('Você quer apagar o estoque? A ação é irreversível.');
    }
    if (confirm) {
      dispatch(deleteEstoque(estoque.id));
    }
  }, [confirm, dispatch, estoque]);

  return (
    <StyledContainer>
      <h1>Apagar Estoque</h1>
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
        <button type="submit">APAGAR</button>
      </HorizontalContainer>
      {estoque
      && (
      <Form onSubmit={handleSubmit}>
        <Input
          data={estoque}
          setData={setEstoque}
          label="Lote"
          keyName="lote"
          disabled
        />
        <Input
          data={estoque}
          setData={setEstoque}
          label="Quantidade"
          keyName="quantidade"
          keyType={InputType.NUMBER}
          disabled
        />
        <Input
          data={estoque}
          setData={setEstoque}
          label="Quarentena"
          keyName="quarentena"
          keyType={InputType.NUMBER}
          disabled
        />
        <Input
          data={estoque}
          setData={setEstoque}
          label="Validade"
          keyType={InputType.DATE}
          disabled
        />
        <Input
          data={estoque}
          setData={setEstoque}
          label="Descrição"
          keyName="descricao"
          keyType={InputType.TEXTAREA}
          disabled
        />
      </Form>
      )}
    </StyledContainer>
  );
}
export default DeleteEstoque;
