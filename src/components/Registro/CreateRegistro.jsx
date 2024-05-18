import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyledContainer, Form, HorizontalContainer } from '../../config/GlobalStyle';
import Input, { InputType } from '../Input/Input';
import { createRegistro, initialRegistro } from '../../store/modules/registros/reducer';
import validationObject from '../../hooks/validationObject';

function Createregistro() {
  const dispatch = useDispatch();

  const [registro, setRegistro] = useState(initialRegistro);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    const error = validationObject(registro);
    if (!error) {
      dispatch(createRegistro({ ...registro }));
    }
  }, [dispatch, registro]);

  return (
    <StyledContainer>
      <Form onSubmit={handleSubmit}>
        <h1>Criar Registro</h1>
        <HorizontalContainer>
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
        </HorizontalContainer>
        <HorizontalContainer>
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
        </HorizontalContainer>
        <button type="submit">CRIAR</button>
      </Form>
    </StyledContainer>
  );
}
export default Createregistro;
