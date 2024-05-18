import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';
import { StyledContainer, Form, HorizontalContainer } from '../../config/GlobalStyle';
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

  const inputWidth = 300;

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Criar Registro</h1>
        <HorizontalContainer>
          <Autocomplete
            freeSolo
            disablePortal
            id="search-produto"
            onChange={(event, value) => setEstoque(value?.item)}
            options={convertOptions(estoques, 'lote')}
            sx={{ width: 400 }}
          // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} label="Estoques" />}
          />
          <button type="submit">CRIAR</button>
        </HorizontalContainer>
        {estoque
        && (
          <>
            <HorizontalContainer>
              <Input
                data={registro}
                setData={setRegistro}
                label="Entrada Quarentena"
                keyName="entradaQuarentena"
                keyType={InputType.NUMBER}
                inputWidth={inputWidth}
              />
              <Input
                data={registro}
                setData={setRegistro}
                label="Saida Quarentena"
                keyName="saidaQuarentena"
                keyType={InputType.NUMBER}
                inputWidth={inputWidth}
              />
              <TextField
                type="number"
                label="Quarentena"
                value={estoque.quarentena + registro.entradaQuarentena - registro.saidaQuarentena}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </HorizontalContainer>
            <HorizontalContainer>
              <Input
                data={registro}
                setData={setRegistro}
                label="Entrada Quantidade"
                keyName="entradaQuantidade"
                keyType={InputType.NUMBER}
                inputWidth={inputWidth}
              />
              <Input
                data={registro}
                setData={setRegistro}
                label="Saida Quantidade"
                keyName="saidaQuantidade"
                keyType={InputType.NUMBER}
                inputWidth={inputWidth}
              />
              <TextField
                type="number"
                label="Quantidade"
                value={estoque.quantidade + registro.entradaQuantidade - registro.saidaQuantidade}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </HorizontalContainer>
          </>
        )}
      </Form>
    </StyledContainer>
  );
}
export default Createregistro;
