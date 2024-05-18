import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { StyledContainer, Form } from '../../config/GlobalStyle';
import Input, { InputType } from '../Input/Input';
import { editRegistro } from '../../store/modules/registros/reducer';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import convertOptions from '../../hooks/convertOptions';
import validationObject from '../../hooks/validationObject';

function Editregistro() {
  const dispatch = useDispatch();

  const [registro, setRegistro] = useState();

  const registros = convertObjectToArray(useSelector((state) => state.registros.registros)) || [];

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const error = validationObject(registro);
    if (!error) {
      dispatch(editRegistro({ ...registro }));
    }
  }, [dispatch, registro]);

  return (
    <StyledContainer>
      <h1>Editar Registro</h1>
      <Autocomplete
        freeSolo
        disablePortal
        id="search-registro"
        onChange={(event, value) => setRegistro(value?.item)}
        options={convertOptions(registros, 'id')}
        sx={{ width: 400 }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Registros" />}
      />
      {registro
      && (
      <Form onSubmit={handleSubmit}>
        <Input
          data={registro}
          setData={setRegistro}
          label="Entrada Quarentena"
          keyName="entradaQuarentena"
          keyType={InputType.NUMBER}
        />
        <Input
          data={registro}
          setData={setRegistro}
          label="Saida Quarentena"
          keyName="saidaQuarentena"
          keyType={InputType.NUMBER}
        />
        <Input
          data={registro}
          setData={setRegistro}
          label="Saldo Quarentena Inicial"
          keyName="saldoQuarentenaInicial"
          keyType={InputType.NUMBER}
        />
        <Input
          data={registro}
          setData={setRegistro}
          label="Saida Quarentena Final"
          keyName="saldoQuarentenaFinal"
          keyType={InputType.NUMBER}
        />
        <Input
          data={registro}
          setData={setRegistro}
          label="Entrada Quantidade"
          keyType={InputType.NUMBER}
        />
        <Input
          data={registro}
          setData={setRegistro}
          label="Saida Quantidade"
          keyType={InputType.NUMBER}
        />
        <Input
          data={registro}
          setData={setRegistro}
          label="Saldo Quantidade Inicial"
          keyName="saldoQuarentenaInicial"
          keyType={InputType.NUMBER}
        />
        <Input
          data={registro}
          setData={setRegistro}
          label="Saida Quantidade Final"
          keyName="saldoQuarentenaFinal"
          keyType={InputType.NUMBER}
        />
        <button type="submit">EDITAR</button>
      </Form>
      )}
    </StyledContainer>
  );
}
export default Editregistro;
