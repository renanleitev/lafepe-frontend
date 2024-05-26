import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, MenuItem } from '@mui/material';
import DashboardChart from '../../components/Dashboard/DashboardChart';
import {
  getEstoqueByPeriodo,
} from '../../store/modules/estoques/reducer';
import getLastAndNextYears from '../../hooks/getLastAndNextYears';
import { HorizontalContainer } from '../../config/GlobalStyle';
import getMonths from '../../hooks/getMonths';

export default function ChartsEstoquesPage() {
  const dispatch = useDispatch();

  const estoquesPeriodo = useSelector(
    (state) => (state.estoques.estoquesPeriodo),
  ) || [];

  const [ano, setAno] = useState(new Date().getFullYear());
  const [color, setColor] = useState('red');

  const dataInicio = `${ano}-01-01`;
  const dataLimite = `${ano}-12-30`;

  const [option, setOption] = useState('prejuizo');

  useEffect(() => {
    dispatch(getEstoqueByPeriodo({ option, dataInicio, dataLimite }));
  }, [dataInicio, dataLimite, dispatch, option]);

  const series = [{ data: estoquesPeriodo, color }];

  const yearOptions = getLastAndNextYears(5);

  const options = [
    {
      value: 'prejuizo',
      label: 'Prejuízo',
    },
    {
      value: 'quantidade',
      label: 'Total',
    },
  ];

  const handleOption = useCallback((e) => {
    setOption(e.target.value);
    switch (e.target.value) {
      case 'prejuizo':
        setColor('red');
        break;
      case 'quantidade':
        setColor('green');
        break;
      default:
        setColor('red');
        break;
    }
  }, []);

  return (
    <>
      <HorizontalContainer>
        <Typography variant="h5">
          Estoque X Validade
        </Typography>
        <TextField
          id="outlined-select-option"
          select
          label="Opção"
          defaultValue={option}
          onChange={handleOption}
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
        labels={getMonths()}
      />
    </>
  );
}
