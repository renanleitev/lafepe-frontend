import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  StyledContainer,
  Form,
  HorizontalContainer,
} from '../../config/GlobalStyle';
import Input, { InputType } from '../Input/Input';
import { editRegistro, getRegistroByEstoqueLote } from '../../store/modules/registros/reducer';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import convertOptions from '../../hooks/convertOptions';
import validationObject from '../../hooks/validationObject';
import convertDate, { convertDateReverse } from '../../hooks/convertDate';
import { getEstoques } from '../../store/modules/estoques/reducer';

function Editregistro() {
  const dispatch = useDispatch();

  const [registro, setRegistro] = useState();
  const [estoque, setEstoque] = useState();

  const registros = convertObjectToArray(useSelector((state) => state.registros.registros)) || [];
  const estoques = convertObjectToArray(useSelector((state) => state.estoques.estoques)) || [];

  useEffect(() => {
    dispatch(getEstoques());
    if (estoque) {
      dispatch(getRegistroByEstoqueLote(estoque.lote));
    }
  }, [dispatch, estoque]);

  const registrosConverted = registros.map(
    (registroItem) => ({ ...registroItem, data: convertDate(registroItem.data) }),
  );

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const error = validationObject(registro);
    if (!error) {
      dispatch(editRegistro({ ...registro, data: convertDateReverse(registro.data) }));
    }
  }, [dispatch, registro]);

  const inputWidth = 300;

  return (
    <StyledContainer>
      <h1>Editar Registro</h1>
      <Autocomplete
        freeSolo
        disablePortal
        id="search-estoques"
        onChange={(event, value) => setEstoque(value?.item)}
        options={convertOptions(estoques, 'lote')}
        sx={{ width: 400 }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => <TextField {...params} label="Lote" />}
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
        renderInput={(params) => <TextField {...params} label="Data" />}
      />
      )}
      {registro
      && (
      <Form onSubmit={handleSubmit}>
        <HorizontalContainer>
          <Input
            data={registro}
            setData={setRegistro}
            label="Entrada"
            keyName="entrada"
            keyType={InputType.NUMBER}
            inputWidth={inputWidth}
          />
          <Input
            data={registro}
            setData={setRegistro}
            label="Saida"
            keyName="saida"
            keyType={InputType.NUMBER}
            inputWidth={inputWidth}
          />
        </HorizontalContainer>
        <Input
          data={{ ...registro, data: convertDateReverse(registro.data) }}
          setData={setRegistro}
          label="Data"
          keyName="data"
          keyType={InputType.DATE}
          inputWidth={inputWidth}
        />
        <button type="submit">EDITAR</button>
      </Form>
      )}
    </StyledContainer>
  );
}
export default Editregistro;
