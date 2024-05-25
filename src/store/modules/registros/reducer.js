/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance, { baseRegistrosURL } from '../../../services/axios';
import fetchStatus from '../../../config/fetchStatus';
import { initialEstoque } from '../estoques/reducer';
import { getCurrentDateFormatted } from '../../../hooks/convertDate';

export const initialRegistro = {
  id: '',
  entradaQuarentena: 0,
  saidaQuarentena: 0,
  saldoQuarentenaInicial: 0,
  saldoQuarentenaFinal: 0,
  entradaQuantidade: 0,
  saidaQuantidade: 0,
  saldoQuantidadeInicial: 0,
  saldoQuantidadeFinal: 0,
  data: getCurrentDateFormatted(),
  estoqueId: initialEstoque.id,
  estoque: initialEstoque,
  registrosEntradaQuantidade: [],
  registrosSaidaQuantidade: [],
  registrosEntradaQuarentena: [],
  registrosSaidaQuarentena: [],
};

// Para a requisição POST
export const initialRegistroForPostAPI = {
  entradaQuarentena: 0,
  saidaQuarentena: 0,
  entradaQuantidade: 0,
  saidaQuantidade: 0,
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

export const getRegistroByEntradaQuarentena = createAsyncThunk(
  'registros/getRegistroByEntradaQuarentena',
  async ({ dataInicio, dataLimite }) => {
    try {
      const url = `${baseRegistrosURL}/quarentena/entrada/periodo/${dataInicio}/${dataLimite}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getRegistroBySaidaQuarentena = createAsyncThunk(
  'registros/getRegistroBySaidaQuarentena',
  async ({ dataInicio, dataLimite }) => {
    try {
      const url = `${baseRegistrosURL}/quarentena/saida/periodo/${dataInicio}/${dataLimite}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getRegistroByEntradaQuantidade = createAsyncThunk(
  'registros/getRegistroByEntradaQuantidade',
  async ({ dataInicio, dataLimite }) => {
    try {
      const url = `${baseRegistrosURL}/quantidade/entrada/periodo/${dataInicio}/${dataLimite}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getRegistroBySaidaQuantidade = createAsyncThunk(
  'registros/getRegistroBySaidaQuantidade',
  async ({ dataInicio, dataLimite }) => {
    try {
      const url = `${baseRegistrosURL}/quantidade/saida/periodo/${dataInicio}/${dataLimite}`;
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

      // getRegistroByEntradaQuarentena
      .addCase(getRegistroByEntradaQuarentena.fulfilled, (state, action) => {
        state.registrosEntradaQuarentena = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getRegistroByEntradaQuarentena.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getRegistroByEntradaQuarentena.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getRegistroBySaidaQuarentena
      .addCase(getRegistroBySaidaQuarentena.fulfilled, (state, action) => {
        state.registrosSaidaQuarentena = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getRegistroBySaidaQuarentena.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getRegistroBySaidaQuarentena.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getRegistroByEntradaQuantidade
      .addCase(getRegistroByEntradaQuantidade.fulfilled, (state, action) => {
        state.registrosEntradaQuantidade = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getRegistroByEntradaQuantidade.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getRegistroByEntradaQuantidade.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getRegistroBySaidaQuantidade
      .addCase(getRegistroBySaidaQuantidade.fulfilled, (state, action) => {
        state.registrosSaidaQuantidade = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getRegistroBySaidaQuantidade.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getRegistroBySaidaQuantidade.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const registrosReducer = registrosSlice.reducer;
