/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance, { baseEstoquesURL } from '../../../services/axios';
import fetchStatus from '../../../config/fetchStatus';
import { initialProduto } from '../produtos/reducer';
import { getCurrentDateFormatted } from '../../../hooks/convertDate';

export const initialEstoque = {
  id: '',
  lote: '',
  quantidade: 0,
  unidade: '',
  quarentena: 0,
  saldoAtual: 0,
  saldoOriginal: 0,
  precoUnitario: 0,
  validade: getCurrentDateFormatted(),
  produtoId: initialProduto.id,
  produto: initialProduto,
};

const initialState = {
  status: fetchStatus.IDLE,
  error: '',
  estoque: initialEstoque,
  estoques: [],
  estoquesVencidos: [],
  estoquesValidade1Mes: [],
  estoquesValidade6Meses: [],
  estoquesValidade12Meses: [],
  estoquesNegativos: [],
  estoquesPositivos: [],
  estoquesPrejuizoSaldoAtual: 0,
  estoquesPeriodo: [],
};

export const getEstoques = createAsyncThunk(
  'estoques/getEstoques',
  async () => {
    try {
      const response = await axiosInstance.get(baseEstoquesURL);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoque = createAsyncThunk(
  'estoques/getEstoque',
  async (id) => {
    try {
      const url = `${baseEstoquesURL}/${id}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const editEstoque = createAsyncThunk(
  'estoques/editEstoque',
  async (estoque) => {
    try {
      const url = `${baseEstoquesURL}/${estoque.id}`;
      const produtoEdited = await axiosInstance.put(url, estoque);
      toast.success('Estoque editado com sucesso.');
      return produtoEdited;
    } catch (error) { return error.message; }
  },
);

export const createEstoque = createAsyncThunk(
  'estoques/createEstoque',
  async (produto) => {
    try {
      const produtoCreated = await axiosInstance.post(baseEstoquesURL, produto);
      toast.success('Estoque criado com sucesso.');
      return produtoCreated;
    } catch (error) { return error.message; }
  },
);

export const deleteEstoque = createAsyncThunk(
  'estoques/deleteEstoque',
  async (id) => {
    try {
      const produtoCreated = await axiosInstance.delete(`${baseEstoquesURL}/${id}`, id);
      toast.success('Estoque apagado com sucesso.');
      return produtoCreated;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueByProdutoId = createAsyncThunk(
  'estoques/getEstoqueByProdutoId',
  async (id) => {
    try {
      const url = `${baseEstoquesURL}/produto/${id}}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueBySaldoPositivo = createAsyncThunk(
  'estoques/getEstoqueBySaldoPositivo',
  async () => {
    try {
      const response = await axiosInstance.get(baseEstoquesURL);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueBySaldoNegativo = createAsyncThunk(
  'estoques/getEstoqueBySaldoNegativo',
  async () => {
    try {
      const response = await axiosInstance.get(baseEstoquesURL);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueByValidade = createAsyncThunk(
  'produtos/searchEstoqueByValidade',
  async ({ validade, operador }) => {
    try {
      const url = `${baseEstoquesURL}/query?validade=${validade}&operador=${operador}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueByValidadeVencidos = createAsyncThunk(
  'estoques/getEstoqueByValidadeVencidos',
  async () => {
    try {
      const url = `${baseEstoquesURL}/validade/vencidos`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueByPrejuizoSaldoAtual = createAsyncThunk(
  'estoques/getEstoqueByPrejuizoSaldoAtual',
  async () => {
    try {
      const url = `${baseEstoquesURL}/validade/prejuizo/saldoAtual`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueByPeriodo = createAsyncThunk(
  'estoques/getEstoqueByPeriodo',
  async ({ option, dataInicio, dataLimite }) => {
    try {
      const url = `${baseEstoquesURL}/validade/${option}/periodo/${dataInicio}/${dataLimite}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueByValidadeVencidosQuery = createAsyncThunk(
  'estoques/getEstoqueByValidadeVencidosQuery',
  async () => {
    try {
      const url = `${baseEstoquesURL}/validade/vencidos`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueByValidadePeriodo = createAsyncThunk(
  'estoques/getEstoqueByValidadePeriodo',
  async (periodo) => {
    try {
      const url = `${baseEstoquesURL}/validade/${periodo}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueByValidade1Mes = createAsyncThunk(
  'estoques/getEstoqueByValidade1Mes',
  async () => {
    try {
      const url = `${baseEstoquesURL}/validade/1`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueByValidade6Meses = createAsyncThunk(
  'estoques/getEstoqueByValidade6Meses',
  async () => {
    try {
      const url = `${baseEstoquesURL}/validade/6`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueByValidade12Meses = createAsyncThunk(
  'estoques/getEstoqueByValidade12Meses',
  async () => {
    try {
      const url = `${baseEstoquesURL}/validade/12`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueByLote = createAsyncThunk(
  'estoques/searchEstoqueByLote',
  async (lote) => {
    try {
      const url = `${baseEstoquesURL}/query?lote=${lote}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueByUnidade = createAsyncThunk(
  'estoques/searchEstoqueByUnidade',
  async (unidade) => {
    try {
      const url = `${baseEstoquesURL}/query?unidade=${unidade}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueByQuantidade = createAsyncThunk(
  'estoques/searchEstoqueByQuantidade',
  async ({ quantidade, operador }) => {
    try {
      const url = `${baseEstoquesURL}/query?quantidade=${quantidade}&operador=${operador}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueByQuarentena = createAsyncThunk(
  'estoques/searchEstoqueByQuarentena',
  async ({ quarentena, operador }) => {
    try {
      const url = `${baseEstoquesURL}/query?quarentena=${quarentena}&operador=${operador}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueBySaldoAtual = createAsyncThunk(
  'estoques/searchEstoquesBySaldoAtual',
  async ({ saldoAtual, operador }) => {
    try {
      const url = `${baseEstoquesURL}/query?saldoAtual=${saldoAtual}&operador=${operador}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueBySaldoOriginal = createAsyncThunk(
  'estoques/searchEstoqueBySaldoOriginal',
  async ({ saldoOriginal, operador }) => {
    try {
      const url = `${baseEstoquesURL}/query?saldoOriginal=${saldoOriginal}&operador=${operador}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const estoquesSlice = createSlice({
  name: 'estoques',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    // getEstoques
      .addCase(getEstoques.fulfilled, (state, action) => {
        state.status = fetchStatus.SUCCESS;
        state.estoques = action.payload;
        state.estoquesPositivos = action.payload.filter((estoque) => estoque.saldoAtual > 0);
        state.estoquesNegativos = action.payload.filter((estoque) => estoque.saldoAtual < 0);
      })
      .addCase(getEstoques.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoques.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getEstoqueBySaldoPositivo
      .addCase(getEstoqueBySaldoPositivo.fulfilled, (state, action) => {
        state.status = fetchStatus.SUCCESS;
        const estoques = action.payload;
        const estoquesPositivos = estoques.filter((estoque) => estoque.saldoAtual > 0);
        state.estoques = estoquesPositivos;
      })
      .addCase(getEstoqueBySaldoPositivo.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoqueBySaldoPositivo.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getEstoqueBySaldoNegativo
      .addCase(getEstoqueBySaldoNegativo.fulfilled, (state, action) => {
        state.status = fetchStatus.SUCCESS;
        const estoques = action.payload;
        const estoquesNegativos = estoques.filter((estoque) => estoque.saldoAtual < 0);
        state.estoques = estoquesNegativos;
      })
      .addCase(getEstoqueBySaldoNegativo.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoqueBySaldoNegativo.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getEstoque
      .addCase(getEstoque.fulfilled, (state, action) => {
        state.status = fetchStatus.SUCCESS;
        state.estoque = action.payload;
      })
      .addCase(getEstoque.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoque.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // editEstoque
      .addCase(editEstoque.fulfilled, (state, action) => {
        state.estoque = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(editEstoque.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(editEstoque.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // createEstoque
      .addCase(createEstoque.fulfilled, (state, action) => {
        state.estoque = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(createEstoque.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(createEstoque.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // deleteEstoque
      .addCase(deleteEstoque.fulfilled, (state) => {
        state.estoque = initialEstoque;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(deleteEstoque.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(deleteEstoque.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getEstoqueByProdutoId
      .addCase(getEstoqueByProdutoId.fulfilled, (state, action) => {
        state.estoques = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getEstoqueByProdutoId.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoqueByProdutoId.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // searchEstoqueByValidade
      .addCase(searchEstoqueByValidade.fulfilled, (state, action) => {
        state.estoques = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(searchEstoqueByValidade.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(searchEstoqueByValidade.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getEstoqueByValidadeVencidos
      .addCase(getEstoqueByValidadeVencidos.fulfilled, (state, action) => {
        state.estoquesVencidos = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getEstoqueByValidadeVencidos.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoqueByValidadeVencidos.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getEstoqueByPrejuizoSaldoAtual
      .addCase(getEstoqueByPrejuizoSaldoAtual.fulfilled, (state, action) => {
        state.estoquesPrejuizoSaldoAtual = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getEstoqueByPrejuizoSaldoAtual.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoqueByPrejuizoSaldoAtual.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })
    // getEstoqueByValidadeVencidosQuery
      .addCase(getEstoqueByValidadeVencidosQuery.fulfilled, (state, action) => {
        state.estoques = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getEstoqueByValidadeVencidosQuery.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoqueByValidadeVencidosQuery.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // getEstoqueByValidadePeriodo
      .addCase(getEstoqueByValidadePeriodo.fulfilled, (state, action) => {
        state.estoques = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getEstoqueByValidadePeriodo.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoqueByValidadePeriodo.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message;
      })

    // getEstoqueByPeriodo
      .addCase(getEstoqueByPeriodo.fulfilled, (state, action) => {
        state.estoquesPeriodo = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getEstoqueByPeriodo.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoqueByPeriodo.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message;
      })

    // getEstoqueByValidade1Mes
      .addCase(getEstoqueByValidade1Mes.fulfilled, (state, action) => {
        state.estoquesValidade1Mes = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getEstoqueByValidade1Mes.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoqueByValidade1Mes.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message;
      })

    // getEstoqueByValidade6Meses
      .addCase(getEstoqueByValidade6Meses.fulfilled, (state, action) => {
        state.estoquesValidade6Meses = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getEstoqueByValidade6Meses.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoqueByValidade6Meses.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message;
      })

    // getEstoqueByValidade12Meses
      .addCase(getEstoqueByValidade12Meses.fulfilled, (state, action) => {
        state.estoquesValidade12Meses = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getEstoqueByValidade12Meses.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoqueByValidade12Meses.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message;
      })

    // searchEstoqueByLote
      .addCase(searchEstoqueByLote.fulfilled, (state, action) => {
        state.estoques = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(searchEstoqueByLote.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(searchEstoqueByLote.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // searchEstoqueByUnidade
      .addCase(searchEstoqueByUnidade.fulfilled, (state, action) => {
        state.estoques = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(searchEstoqueByUnidade.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(searchEstoqueByUnidade.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // searchEstoqueByQuantidade
      .addCase(searchEstoqueByQuantidade.fulfilled, (state, action) => {
        state.estoques = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(searchEstoqueByQuantidade.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(searchEstoqueByQuantidade.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // searchEstoquesByQuarentena
      .addCase(searchEstoqueByQuarentena.fulfilled, (state, action) => {
        state.estoques = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(searchEstoqueByQuarentena.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(searchEstoqueByQuarentena.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // searchEstoqueBySaldoAtual
      .addCase(searchEstoqueBySaldoAtual.fulfilled, (state, action) => {
        state.estoques = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(searchEstoqueBySaldoAtual.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(searchEstoqueBySaldoAtual.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      })

    // searchEstoqueBySaldoOriginal
      .addCase(searchEstoqueBySaldoOriginal.fulfilled, (state, action) => {
        state.estoques = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(searchEstoqueBySaldoOriginal.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(searchEstoqueBySaldoOriginal.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const estoquesReducer = estoquesSlice.reducer;
