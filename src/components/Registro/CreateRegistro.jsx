import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';
import { StyledContainer, Form, VerticalContainer } from '../../config/GlobalStyle';
import Input, { InputType } from '../Input/Input';
import { createRegistro, initialRegistroForPostAPI } from '../../store/modules/registros/reducer';
import validationObject from '../../hooks/validationObject';
import convertOptions from '../../hooks/convertOptions';
import { getEstoques } from '../../store/modules/estoques/reducer';

function Createregistro() {
  const dispatch = useDispatch();

  const [registro, setRegistro] = useState(initialRegistroForPostAPI);
  const [estoque, setEstoque] = useState();
  const estoques = useSelector((state) => state.estoques.estoques) || [];

  useEffect(() => {
    dispatch(getEstoques());
  }, [dispatch]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    registro.estoqueId = estoque?.id;
    const error = validationObject(registro);
    if (!error) {
      dispatch(createRegistro(registro));
    }
  }, [dispatch, estoque?.id, registro]);

  const inputWidth = 400;

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Criar Registro</h1>
        <VerticalContainer>
          <Autocomplete
            freeSolo
            disablePortal
            id="search-produto"
            onChange={(event, value) => setEstoque(value?.item)}
            options={convertOptions(estoques, 'lote')}
            sx={{ width: 400 }}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} label="Lote" />}
            disabled={estoques.length === 0}
          />
        </VerticalContainer>
        {estoque
        && (
          <VerticalContainer>
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
            <TextField
              type="number"
              label="Saldo"
              value={
                Number.parseInt(estoque.saldoAtual, 10)
              + Number.parseInt(registro.entrada, 10)
              - Number.parseInt(registro.saida, 10)
              }
              InputLabelProps={{ shrink: true }}
              sx={{ width: 400 }}
              disabled
            />
          </VerticalContainer>
        )}
        <button type="submit">CRIAR</button>
      </Form>
    </StyledContainer>
  );
}
export default Createregistro;
