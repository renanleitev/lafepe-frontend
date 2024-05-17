/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance, { baseEstoquesURL } from '../../../services/axios';
import fetchStatus from '../../../config/fetchStatus';
import { initialProduto } from '../produtos/reducer';

export const initialEstoque = {
  id: '',
  lote: '',
  quantidade: 0,
  unidade: '',
  quarentena: 0,
  saldoAtual: 0,
  saldoOriginal: 0,
  precoUnitario: 0,
  validade: new Date(),
  descricao: '',
  produtoId: initialProduto.id,
  produto: initialProduto,
};

const initialState = {
  status: fetchStatus.IDLE,
  error: '',
  estoque: initialEstoque,
  estoques: [initialEstoque],
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

export const getEstoqueByProdutoId = createAsyncThunk(
  'estoques/getEstoqueByProdutoId',
  async (id) => {
    try {
      const url = `/${baseEstoquesURL}/produto/${id}}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueByValidade = createAsyncThunk(
  'produtos/searchEstoqueByValidade',
  async (validade, operador) => {
    try {
      const url = `/${baseEstoquesURL}/query?validade=${validade}&operador=${operador}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueByValidadeVencidos = createAsyncThunk(
  'estoques/getEstoqueByValidadeVencidos',
  async () => {
    try {
      const url = `/${baseEstoquesURL}/validade/vencidos`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getEstoqueByValidadePeriodo = createAsyncThunk(
  'estoques/getEstoqueByValidadePeriodo',
  async (periodo) => {
    try {
      const url = `/${baseEstoquesURL}/validade/${periodo}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueByLote = createAsyncThunk(
  'estoques/searchEstoqueByLote',
  async (lote) => {
    try {
      const url = `/${baseEstoquesURL}/query?lote=${lote}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueByDescricao = createAsyncThunk(
  'estoques/searchEstoqueByDescricao',
  async (descricao) => {
    try {
      const url = `/${baseEstoquesURL}/query?lote=${descricao}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueByUnidade = createAsyncThunk(
  'estoques/searchEstoqueByUnidade',
  async (unidade) => {
    try {
      const url = `/${baseEstoquesURL}/query?unidade=${unidade}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueByQuantidade = createAsyncThunk(
  'estoques/searchEstoqueByQuantidade',
  async (quantidade, operador) => {
    try {
      const url = `/${baseEstoquesURL}/query?quantidade=${quantidade}&operador=${operador}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueByQuarentena = createAsyncThunk(
  'estoques/searchEstoqueByQuarentena',
  async (quarentena, operador) => {
    try {
      const url = `/${baseEstoquesURL}/query?quarentena=${quarentena}&operador=${operador}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueBySaldoAtual = createAsyncThunk(
  'estoques/searchEstoquesBySaldoAtual',
  async (saldoAtual, operador) => {
    try {
      const url = `/${baseEstoquesURL}/query?saldoAtual=${saldoAtual}&operador=${operador}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchEstoqueBySaldoOriginal = createAsyncThunk(
  'estoques/searchEstoqueBySaldoOriginal',
  async (saldoOriginal, operador) => {
    try {
      const url = `/${baseEstoquesURL}/query?saldoOriginal=${saldoOriginal}&operador=${operador}`;
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
      })
      .addCase(getEstoques.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoques.rejected, (state, action) => {
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
        state.estoques = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(getEstoqueByValidadeVencidos.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(getEstoqueByValidadeVencidos.rejected, (state, action) => {
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

    // searchEstoqueByDescricao
      .addCase(searchEstoqueByDescricao.fulfilled, (state, action) => {
        state.estoques = action.payload;
        state.status = fetchStatus.SUCCESS;
      })
      .addCase(searchEstoqueByDescricao.pending, (state) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(searchEstoqueByDescricao.rejected, (state, action) => {
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
