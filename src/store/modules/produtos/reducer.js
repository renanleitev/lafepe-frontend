/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance, { baseProdutosURL } from '../../../services/axios';
import fetchStatus from '../../../config/fetchStatus';

export const initialProduto = {
  id: '',
  codigo: '',
  nome: '',
  descricao: '',
  precoUnitario: 0,
};

// Para a requisição POST
export const initialProdutoForPostAPI = {
  codigo: '',
  nome: '',
  descricao: '',
  precoUnitario: 0,
};

const initialState = {
  status: fetchStatus.IDLE,
  error: '',
  produto: initialProduto,
  produtos: [],
};

export const getProdutos = createAsyncThunk(
  'produtos/getProdutos',
  async () => {
    try {
      const url = `${baseProdutosURL}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const getProduto = createAsyncThunk(
  'produtos/getProduto',
  async (id) => {
    try {
      const url = `${baseProdutosURL}/${id}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const editProduto = createAsyncThunk(
  'produtos/editProduto',
  async (produto) => {
    try {
      const url = `${baseProdutosURL}/${produto.id}`;
      const produtoEdited = await axiosInstance.put(url, produto);
      toast.success('Produto editado com sucesso.');
      return produtoEdited;
    } catch (error) { return error.message; }
  },
);

export const createProduto = createAsyncThunk(
  'produtos/createProduto',
  async (produto) => {
    try {
      const produtoCreated = await axiosInstance.post(baseProdutosURL, produto);
      toast.success('Produto criado com sucesso.');
      return produtoCreated;
    } catch (error) { return error.message; }
  },
);

export const deleteProduto = createAsyncThunk(
  'produtos/deleteProduto',
  async (produto) => {
    try {
      const url = `${baseProdutosURL}/${produto.id}`;
      await axiosInstance.delete(url, produto);
      toast.success('Produto deletado com sucesso.');
      return initialProduto;
    } catch (error) { return error.message; }
  },
);

export const searchProdutoByNome = createAsyncThunk(
  'produtos/searchProdutoByNome',
  async (nome) => {
    try {
      const url = `${baseProdutosURL}/query?nome=${nome}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchProdutoByCodigo = createAsyncThunk(
  'produtos/searchProdutoByCodigo',
  async (codigo) => {
    try {
      const url = `${baseProdutosURL}/query?codigo=${codigo}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchProdutoByDescricao = createAsyncThunk(
  'produtos/searchProdutoByDescricao',
  async (descricao) => {
    try {
      const url = `${baseProdutosURL}/query?descricao=${descricao}`;
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const searchProdutoByPrecoUnitario = createAsyncThunk(
  'produtos/searchProdutoByPrecoUnitario',
  async (args) => {
    try {
      const url = `${baseProdutosURL}/query`;
      const { precoUnitario, operador } = args;
      const response = await axiosInstance.get(url, {
        params: {
          precoUnitario,
          operador,
        },
      });
      return response.data;
    } catch (error) { return error.message; }
  },
);

export const produtosSlice = createSlice({
  name: 'produtos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // PRODUTO
      // Get Produto
      .addCase(
        getProduto.fulfilled,
        (state, action) => {
          state.status = fetchStatus.SUCCESS;
          state.produto = { ...action.payload };
        },
      )
      .addCase(getProduto.pending, (state) => { state.status = fetchStatus.PENDING; })
      .addCase(getProduto.rejected, (state, action) => {
        state.status = fetchStatus.ERROR;
        state.error = action.error.message || 'Something went wrong';
      })
      // Create Produto
      .addCase(
        createProduto.fulfilled,
        (state, action) => {
          state.status = fetchStatus.SUCCESS;
          state.produto = { ...action.payload };
        },
      )
      .addCase(createProduto.pending, (state) => { state.status = fetchStatus.PENDING; })
      .addCase(createProduto.rejected, (state, action) => {
        state.status = fetchStatus.ERROR;
        state.error = action.error.message || 'Something went wrong';
      })
      // Edit Produto
      .addCase(
        editProduto.fulfilled,
        (state, action) => {
          state.status = fetchStatus.SUCCESS;
          state.produto = { ...action.payload };
        },
      )
      .addCase(editProduto.pending, (state) => { state.status = fetchStatus.PENDING; })
      .addCase(editProduto.rejected, (state, action) => {
        state.status = fetchStatus.ERROR;
        state.error = action.error.message || 'Something went wrong';
      })
    // Delete Produto
      .addCase(
        deleteProduto.fulfilled,
        (state) => {
          state.status = fetchStatus.SUCCESS;
          state.produto = initialProduto;
        },
      )
      .addCase(deleteProduto.pending, (state) => { state.status = fetchStatus.PENDING; })
      .addCase(deleteProduto.rejected, (state, action) => {
        state.status = fetchStatus.ERROR;
        state.error = action.error.message || 'Something went wrong';
      })
      // PRODUTOS
      // Get Produtos
      .addCase(
        getProdutos.fulfilled,
        (state, action) => {
          state.status = fetchStatus.SUCCESS;
          state.produtos = action.payload;
        },
      )
      .addCase(getProdutos.pending, (state) => { state.status = fetchStatus.PENDING; })
      .addCase(getProdutos.rejected, (state, action) => {
        state.status = fetchStatus.ERROR;
        state.error = action.error.message || 'Algo deu errado';
      })
      // Preço
      .addCase(searchProdutoByPrecoUnitario.fulfilled, (state, action) => {
        state.status = fetchStatus.SUCCESS;
        state.produtos = action.payload;
      })
      .addCase(searchProdutoByPrecoUnitario.pending, (
        state,
      ) => {
        state.status = fetchStatus.PENDING;
      })
      .addCase(searchProdutoByPrecoUnitario.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Algo deu errado';
      })
      // Código
      .addCase(searchProdutoByCodigo.fulfilled, (state, action) => {
        state.status = fetchStatus.SUCCESS;
        state.produtos = action.payload;
      })
      .addCase(searchProdutoByCodigo.pending, (state) => { state.status = fetchStatus.PENDING; })
      .addCase(searchProdutoByCodigo.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Algo deu errado';
      })
      // Nome
      .addCase(searchProdutoByNome.fulfilled, (state, action) => {
        state.status = fetchStatus.SUCCESS;
        state.produtos = action.payload;
      })
      .addCase(searchProdutoByNome.pending, (state) => { state.status = 'loading'; })
      .addCase(searchProdutoByNome.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Algo deu errado';
      })
      // Fabricante
      .addCase(searchProdutoByDescricao.fulfilled, (state, action) => {
        state.status = fetchStatus.SUCCESS;
        state.produtos = action.payload;
      })
      .addCase(searchProdutoByDescricao.pending, (state) => { state.status = 'loading'; })
      .addCase(searchProdutoByDescricao.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Algo deu errado';
      });
  },
});

export const produtosReducer = produtosSlice.reducer;
