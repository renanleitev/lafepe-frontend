import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { StyledContainer, Form, HorizontalContainer } from '../../config/GlobalStyle';
import Input, { InputType } from '../Input/Input';
import { deleteRegistro } from '../../store/modules/registros/reducer';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import convertOptions from '../../hooks/convertOptions';
import validationObject from '../../hooks/validationObject';
import convertDate from '../../hooks/convertDate';

function DeleteRegistro() {
  const dispatch = useDispatch();

  const [registro, setRegistro] = useState();
  const [estoque, setEstoque] = useState();

  const registros = convertObjectToArray(useSelector((state) => state.registros.registros)) || [];
  const estoques = convertObjectToArray(useSelector((state) => state.estoques.estoques)) || [];

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const error = validationObject(registro);
    if (!error) {
      dispatch(deleteRegistro({ ...registro }));
    }
  }, [dispatch, registro]);

  const registrosConverted = registros.map(
    (registroItem) => ({ ...registroItem, data: convertDate(registroItem.data) }),
  );

  const inputWidth = 300;

  return (
    <StyledContainer>
      <h1>Apagar Registro</h1>
      <Autocomplete
        freeSolo
        disablePortal
        id="search-estoques"
        onChange={(event, value) => setEstoque(value?.item)}
        options={convertOptions(estoques, 'lote')}
        sx={{ width: 400 }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Estoque" />}
        disabled={estoques.length === 0}
      />
      {estoque
      && (
      <Autocomplete
        freeSolo
        disablePortal
        id="search-registro"
        onChange={(event, value) => setRegistro(value?.item)}
        options={convertOptions(registrosConverted, 'data')}
        sx={{ width: 400 }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Registros" />}
      />
      )}
      {registro
      && (
      <Form onSubmit={handleSubmit}>
        <HorizontalContainer>
          <Input
            data={registro}
            setData={setRegistro}
            label="Entrada Quarentena"
            keyName="entradaQuarentena"
            keyType={InputType.NUMBER}
            inputWidth={inputWidth}
            disabled
          />
          <Input
            data={registro}
            setData={setRegistro}
            label="Saida Quarentena"
            keyName="saidaQuarentena"
            inputWidth={inputWidth}
            disabled
          />
          <Input
            data={registro}
            setData={setRegistro}
            label="Saldo Quarentena Inicial"
            keyName="saldoQuarentenaInicial"
            inputWidth={inputWidth}
            disabled
          />
          <Input
            data={registro}
            setData={setRegistro}
            label="Saida Quarentena Final"
            keyName="saldoQuarentenaFinal"
            inputWidth={inputWidth}
            disabled
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <Input
            data={registro}
            setData={setRegistro}
            label="Entrada Quantidade"
            inputWidth={inputWidth}
            disabled
          />
          <Input
            data={registro}
            setData={setRegistro}
            label="Saida Quantidade"
            inputWidth={inputWidth}
            disabled
          />
          <Input
            data={registro}
            setData={setRegistro}
            label="Saldo Quantidade Inicial"
            keyName="saldoQuarentenaInicial"
            inputWidth={inputWidth}
            disabled
          />
          <Input
            data={registro}
            setData={setRegistro}
            label="Saida Quantidade Final"
            keyName="saldoQuarentenaFinal"
            inputWidth={inputWidth}
            disabled
          />
        </HorizontalContainer>
        <button type="submit">APAGAR</button>
      </Form>
      )}
    </StyledContainer>
  );
}
export default DeleteRegistro;
