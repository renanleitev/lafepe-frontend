import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import DashboardChart from '../../components/Dashboard/DashboardChart';
import getLastAndNextYears from '../../hooks/getLastAndNextYears';
import { HorizontalContainer } from '../../config/GlobalStyle';
import {
  getRegistroByEntrada,
  getRegistroBySaida,
  getRegistroByLoteEntrada,
  getRegistroByLoteSaida,
} from '../../store/modules/registros/reducer';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import convertOptions from '../../hooks/convertOptions';
import getMonths from '../../hooks/getMonths';

export default function ChartsRegistrosPage() {
  const dispatch = useDispatch();

  const registrosEntrada = useSelector(
    (state) => (state.registros.registrosEntrada),
  ) || [];

  const registrosSaida = useSelector(
    (state) => (state.registros.registrosSaida),
  ) || [];

  const registroLoteEntrada = useSelector(
    (state) => (state.registros.registroLoteEntrada),
  ) || [];

  const registroLoteSaida = useSelector(
    (state) => (state.registros.registroLoteSaida),
  ) || [];

  const estoques = convertObjectToArray(useSelector((state) => state.estoques.estoques)) || [];
  const [estoque, setEstoque] = useState();

  const [ano, setAno] = useState(new Date().getFullYear());

  const dataInicio = `${ano}-01-01`;
  const dataLimite = `${ano}-12-30`;

  const [optionRegistro, setOptionRegistro] = useState('geral');

  useEffect(() => {
    if (optionRegistro === 'geral') {
      dispatch(getRegistroByEntrada({ dataInicio, dataLimite }));
      dispatch(getRegistroBySaida({ dataInicio, dataLimite }));
    } else if (optionRegistro === 'lote') {
      dispatch(getRegistroByLoteEntrada(
        { dataInicio, dataLimite, lote: estoque?.lote },
      ));
      dispatch(getRegistroByLoteSaida(
        { dataInicio, dataLimite, lote: estoque?.lote },
      ));
    }
  }, [dataInicio, dataLimite, dispatch, estoque, estoque?.lote, optionRegistro]);

  const seriesGeral = [
    { data: registrosEntrada, color: 'green', label: 'Entrada' },
    { data: registrosSaida, color: 'red', label: 'Saída' },
  ];

  const seriesLote = [
    { data: registroLoteEntrada, color: 'green', label: 'Entrada' },
    { data: registroLoteSaida, color: 'red', label: 'Saída' },
  ];

  const series = optionRegistro === 'geral' ? seriesGeral : seriesLote;

  const yearOptions = getLastAndNextYears(5);

  const handleOptionRegistro = useCallback((event) => {
    setOptionRegistro(event.target.value);
  }, []);

  return (
    <>
      <HorizontalContainer>
        <Typography variant="h5">
          Registro X Mês
        </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="editar-produto-label-options"
            defaultValue="nome"
            name="radio-buttons-group"
            row
          >
            <FormControlLabel value="geral" control={<Radio />} onChange={handleOptionRegistro} label="Geral" />
            <FormControlLabel value="lote" control={<Radio />} onChange={handleOptionRegistro} label="Lote" />
          </RadioGroup>
        </FormControl>
        {optionRegistro === 'lote' && estoques.length > 0 && (
        <Autocomplete
          freeSolo
          disablePortal
          id="search-estoques"
          onChange={(event, value) => setEstoque(value?.item)}
          options={convertOptions(estoques, 'lote')}
          sx={{ width: 150 }}
        // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} label="Lote" />}
          disabled={estoques.length === 0}
          value={estoques[0]?.lote}
        />
        )}
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
