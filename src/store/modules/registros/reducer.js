/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance, { baseRegistrosURL } from '../../../services/axios';
import fetchStatus from '../../../config/fetchStatus';
import { initialEstoque } from '../estoques/reducer';

const initialRegistro = {
  id: '',
  entradaQuarentena: 0,
  saidaQuarentena: 0,
  saldoQuarentenaInicial: 0,
  saldoQuarentenaFinal: 0,
  entradaQuantidade: 0,
  saidaQuantidade: 0,
  saldoQuantidadeInicial: 0,
  saldoQuantidadeFinal: 0,
  data: new Date(),
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
      const produtoEdited = await axiosInstance.put(url, registro);
      toast.success('Registro editado com sucesso.');
      return produtoEdited;
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

export const getRegistroByEstoqueId = createAsyncThunk(
  'registros/getRegistroByEstoqueId',
  async (id) => {
    try {
      const url = `/${baseRegistrosURL}/estoque/${id}}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchRegistroByData = createAsyncThunk(
  'registros/searchRegistroByValidade',
  async (validade, operador) => {
    try {
      const url = `/${baseRegistrosURL}/query?validade=${validade}&operador=${operador}`;
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
      });
  },
});

export const registrosReducer = registrosSlice.reducer;
