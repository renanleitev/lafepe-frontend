import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, MenuItem } from '@mui/material';
import DashboardChart from '../../components/Dashboard/DashboardChart';
import getLastAndNextYears from '../../hooks/getLastAndNextYears';
import { HorizontalContainer } from '../../config/GlobalStyle';
import {
  getRegistroByEntradaQuantidade,
  getRegistroBySaidaQuantidade,
  getRegistroByEntradaQuarentena,
  getRegistroBySaidaQuarentena,
} from '../../store/modules/registros/reducer';

export default function ChartsRegistrosPage() {
  const dispatch = useDispatch();

  const registrosEntradaQuantidade = useSelector(
    (state) => (state.registros.registrosEntradaQuantidade),
  ) || [];

  const registrosSaidaQuantidade = useSelector(
    (state) => (state.registros.registrosSaidaQuantidade),
  ) || [];

  const registrosEntradaQuarentena = useSelector(
    (state) => (state.registros.registrosEntradaQuarentena),
  ) || [];

  const registrosSaidaQuarentena = useSelector(
    (state) => (state.registros.registrosSaidaQuarentena),
  ) || [];

  const [ano, setAno] = useState(new Date().getFullYear());

  const dataInicio = `${ano}-01-01`;
  const dataLimite = `${ano}-12-30`;

  const [option, setOption] = useState('quarentena');

  useEffect(() => {
    if (option === 'quarentena') {
      dispatch(getRegistroByEntradaQuarentena({ dataInicio, dataLimite }));
      dispatch(getRegistroBySaidaQuarentena({ dataInicio, dataLimite }));
    } else if (option === 'quantidade') {
      dispatch(getRegistroByEntradaQuantidade({ dataInicio, dataLimite }));
      dispatch(getRegistroBySaidaQuantidade({ dataInicio, dataLimite }));
    }
  }, [dataInicio, dataLimite, dispatch, option]);

  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  const seriesQuarentena = [
    { data: registrosEntradaQuarentena, color: 'green', label: 'Entrada' },
    { data: registrosSaidaQuarentena, color: 'red', label: 'Saída' },
  ];

  const seriesQuantidade = [
    { data: registrosEntradaQuantidade, color: 'green', label: 'Entrada' },
    { data: registrosSaidaQuantidade, color: 'red', label: 'Saída' },
  ];

  const series = option === 'quarentena' ? seriesQuarentena : seriesQuantidade;

  const yearOptions = getLastAndNextYears(5);

  const options = [
    {
      value: 'quarentena',
      label: 'Quarentena',
    },
    {
      value: 'quantidade',
      label: 'Quantidade',
    },
  ];

  return (
    <>
      <HorizontalContainer>
        <Typography variant="h5">
          Registro X Mês
        </Typography>
        <TextField
          id="outlined-select-option"
          select
          label="Opção"
          defaultValue={option}
          onChange={(e) => setOption(e.target.value)}
        >
          {options.map((optionItem) => (
            <MenuItem key={optionItem.value} value={optionItem.value}>
              {optionItem.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-option"
          select
          label="Ano"
          defaultValue={ano}
          onChange={(e) => setAno(e.target.value)}
        >
          {yearOptions.map((optionItem) => (
            <MenuItem key={optionItem.value} value={optionItem.value}>
              {optionItem.label}
            </MenuItem>
          ))}
        </TextField>
      </HorizontalContainer>
      <DashboardChart
        series={series}
        labels={months}
      />
    </>
  );
}
