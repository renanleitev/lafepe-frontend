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
  getRegistroByEntradaQuantidade,
  getRegistroBySaidaQuantidade,
  getRegistroByEntradaQuarentena,
  getRegistroBySaidaQuarentena,
  getRegistroByLoteEntradaQuantidade,
  getRegistroByLoteSaidaQuantidade,
  getRegistroByLoteEntradaQuarentena,
  getRegistroByLoteSaidaQuarentena,
} from '../../store/modules/registros/reducer';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import convertOptions from '../../hooks/convertOptions';
import getMonths from '../../hooks/getMonths';

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

  const registroLoteEntradaQuantidade = useSelector(
    (state) => (state.registros.registroLoteEntradaQuantidade),
  ) || [];

  const registroLoteSaidaQuantidade = useSelector(
    (state) => (state.registros.registroLoteSaidaQuantidade),
  ) || [];

  const registroLoteEntradaQuarentena = useSelector(
    (state) => (state.registros.registroLoteEntradaQuarentena),
  ) || [];

  const registroLoteSaidaQuarentena = useSelector(
    (state) => (state.registros.registroLoteSaidaQuarentena),
  ) || [];

  const estoques = convertObjectToArray(useSelector((state) => state.estoques.estoques)) || [];
  const [estoque, setEstoque] = useState();

  const [ano, setAno] = useState(new Date().getFullYear());

  const dataInicio = `${ano}-01-01`;
  const dataLimite = `${ano}-12-30`;

  const [option, setOption] = useState('quarentena');
  const [optionRegistro, setOptionRegistro] = useState('geral');

  useEffect(() => {
    if (optionRegistro === 'geral') {
      if (option === 'quarentena') {
        dispatch(getRegistroByEntradaQuarentena({ dataInicio, dataLimite }));
        dispatch(getRegistroBySaidaQuarentena({ dataInicio, dataLimite }));
      } else if (option === 'quantidade') {
        dispatch(getRegistroByEntradaQuantidade({ dataInicio, dataLimite }));
        dispatch(getRegistroBySaidaQuantidade({ dataInicio, dataLimite }));
      }
    } else if (optionRegistro === 'lote') {
      if (option === 'quarentena' && estoque) {
        dispatch(getRegistroByLoteEntradaQuarentena(
          { dataInicio, dataLimite, lote: estoque?.lote },
        ));
        dispatch(getRegistroByLoteSaidaQuarentena(
          { dataInicio, dataLimite, lote: estoque?.lote },
        ));
      } else if (option === 'quantidade') {
        dispatch(getRegistroByLoteEntradaQuantidade(
          { dataInicio, dataLimite, lote: estoque?.lote },
        ));
        dispatch(getRegistroByLoteSaidaQuantidade(
          { dataInicio, dataLimite, lote: estoque?.lote },
        ));
      }
    }
  }, [dataInicio, dataLimite, dispatch, estoque, estoque?.lote, option, optionRegistro]);

  const seriesQuarentena = [
    { data: registrosEntradaQuarentena, color: 'green', label: 'Entrada' },
    { data: registrosSaidaQuarentena, color: 'red', label: 'Saída' },
  ];

  const seriesQuantidade = [
    { data: registrosEntradaQuantidade, color: 'green', label: 'Entrada' },
    { data: registrosSaidaQuantidade, color: 'red', label: 'Saída' },
  ];

  const seriesLoteQuarentena = [
    { data: registroLoteEntradaQuarentena, color: 'green', label: 'Entrada' },
    { data: registroLoteSaidaQuarentena, color: 'red', label: 'Saída' },
  ];

  const seriesLoteQuantidade = [
    { data: registroLoteEntradaQuantidade, color: 'green', label: 'Entrada' },
    { data: registroLoteSaidaQuantidade, color: 'red', label: 'Saída' },
  ];

  // eslint-disable-next-line no-nested-ternary
  const series = optionRegistro === 'geral'
    ? (option === 'quarentena' ? seriesQuarentena : seriesQuantidade)
    : (option === 'quarentena' ? seriesLoteQuarentena : seriesLoteQuantidade);

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
        labels={getMonths()}
      />
    </>
  );
}
