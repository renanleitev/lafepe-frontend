/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance, { baseRegistrosURL } from '../../../services/axios';
import fetchStatus from '../../../config/fetchStatus';
import { initialEstoque } from '../estoques/reducer';
import { getCurrentDateFormatted } from '../../../hooks/convertDate';

export const initialRegistro = {
  id: '',
  entrada: 0,
  saida: 0,
  saldoInicial: 0,
  saldoFinal: 0,
  data: getCurrentDateFormatted(),
  estoqueId: initialEstoque.id,
  estoque: initialEstoque,
  registrosEntrada: [],
  registrosSaida: [],
  registroLoteEntrada: [],
  registroLoteSaida: [],
};

// Para a requisição POST
export const initialRegistroForPostAPI = {
  entrada: 0,
  saida: 0,
  data: getCurrentDateFormatted(),
  estoqueId: initialEstoque.id,
  estoque: initialEstoque,
};

const initialState = {
  status: fetchStatus.IDLE,
  error: '',
  registro: initialRegistro,
  registros: [],
};

export const getRegistros = createAsyncThunk(
  'registros/getRegistros',
  async () => {
    try {
      const response = await axiosInstance.get(baseRegistrosURL);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getRegistro = createAsyncThunk(
  'registros/getRegistro',
  async (id) => {
    try {
      const url = `${baseRegistrosURL}/${id}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const editRegistro = createAsyncThunk(
  'registros/editRegistro',
  async (registro) => {
    try {
      const url = `${baseRegistrosURL}/${registro.id}`;
      await axiosInstance.put(url, registro);
      toast.success('Registro editado com sucesso.');
      return registro;
    } catch (error) { return error.message; }
  },
);

export const createRegistro = createAsyncThunk(
  'registros/createRegistro',
  async (registro) => {
    try {
      const produtoCreated = await axiosInstance.post(baseRegistrosURL, registro);
      toast.success('Registro criado com sucesso.');
      return produtoCreated;
    } catch (error) { return error.message; }
  },
);

export const deleteRegistro = createAsyncThunk(
  'registros/deleteRegistro',
  async (registro) => {
    try {
      const produtoCreated = await axiosInstance.delete(baseRegistrosURL, registro);
      toast.success('Registro apagado com sucesso.');
      return produtoCreated;
    } catch (error) { return error.message; }
  },
);

export const getRegistroByEstoqueId = createAsyncThunk(
  'registros/getRegistroByEstoqueId',
  async (id) => {
    try {
      const url = `${baseRegistrosURL}/estoque/${id}}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getRegistroByEstoqueLote = createAsyncThunk(
  'registros/getRegistroByEstoqueLote',
  async (lote) => {
    try {
      const url = `${baseRegistrosURL}/query?lote=${lote}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchRegistroByData = createAsyncThunk(
  'registros/searchRegistroByData',
  async ({ data, operador }) => {
    try {
      const url = `${baseRegistrosURL}/query?data=${data}&operador=${operador}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getRegistroByEntrada = createAsyncThunk(
  'registros/getRegistroByEntrada',
  async ({ dataInicio, dataLimite }) => {
    try {
      const url = `${baseRegistrosURL}/estoque/entrada/periodo/${dataInicio}/${dataLimite}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getRegistroBySaida = createAsyncThunk(
  'registros/getRegistroBySaida',
  async ({ dataInicio, dataLimite }) => {
    try {
      const url = `${baseRegistrosURL}/estoque/saida/periodo/${dataInicio}/${dataLimite}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getRegistroByLoteEntrada = createAsyncThunk(
  'registros/getRegistroByLoteEntrada',
  async ({ lote, dataInicio, dataLimite }) => {
    try {
      const url = `${baseRegistrosURL}/estoque/entrada/lote/${lote}/periodo/${dataInicio}/${dataLimite}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getRegistroByLoteSaida = createAsyncThunk(
  'registros/getRegistroByLoteSaida',
  async ({ lote, dataInicio, dataLimite }) => {
    try {
      const url = `${baseRegistrosURL}/estoque/saida/lote/${lote}/periodo/${dataInicio}/${dataLimite}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const registrosSlice = createSlice({
  name: 'registros',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    // getRegistros
      .addCase(getRegistros.fulfilled, (state, action) => {
        state.registros = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getRegistros.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getRegistros.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getRegistro
      .addCase(getRegistro.fulfilled, (state, action) => {
        state.registro = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getRegistro.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getRegistro.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // editRegistro
      .addCase(editRegistro.fulfilled, (state, action) => {
        state.registro = action.payload;
        state.status = fetchStatus.SUCCESS;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(editRegistro.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(editRegistro.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // createRegistro
      .addCase(createRegistro.fulfilled, (state, action) => {
        state.registro = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(createRegistro.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(createRegistro.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // deleteRegistro
      .addCase(deleteRegistro.fulfilled, (state) => {
        state.registro = initialRegistro;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(deleteRegistro.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(deleteRegistro.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getRegistroByEstoqueId
      .addCase(getRegistroByEstoqueId.fulfilled, (state, action) => {
        state.registros = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getRegistroByEstoqueId.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getRegistroByEstoqueId.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getRegistroByEstoqueLote
      .addCase(getRegistroByEstoqueLote.fulfilled, (state, action) => {
        state.registros = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getRegistroByEstoqueLote.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getRegistroByEstoqueLote.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // searchRegistroByData
      .addCase(searchRegistroByData.fulfilled, (state, action) => {
        state.registros = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(searchRegistroByData.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(searchRegistroByData.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

      // getRegistroByEntrada
      .addCase(getRegistroByEntrada.fulfilled, (state, action) => {
        state.registrosEntrada = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getRegistroByEntrada.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getRegistroByEntrada.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getRegistroBySaida
      .addCase(getRegistroBySaida.fulfilled, (state, action) => {
        state.registrosSaida = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getRegistroBySaida.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getRegistroBySaida.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getRegistroByLoteEntrada
      .addCase(getRegistroByLoteEntrada.fulfilled, (state, action) => {
        state.registroLoteEntrada = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getRegistroByLoteEntrada.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getRegistroByLoteEntrada.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getRegistroByLoteSaida
      .addCase(getRegistroByLoteSaida.fulfilled, (state, action) => {
        state.registroLoteSaida = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getRegistroByLoteSaida.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getRegistroByLoteSaida.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const registrosReducer = registrosSlice.reducer;
