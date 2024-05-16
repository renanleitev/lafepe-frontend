/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axiosInstance, { baseProdutosURL } from '../../../services/axios';
import fetchStatus from '../../../config/fetchStatus';

export const initialProduto = {
  id: '',
  codigo: '',
  nome: '',
  fabricante: '',
  precoUnitario: 0,
};

const initialState = {
  status: fetchStatus.IDLE,
  error: '',
  produtos: [],
  produto: initialProduto,
};

export const getProdutos = createAsyncThunk(
  'produtos/getProdutos',
  async () => {
    try {
      const response = await axiosInstance.get(baseProdutosURL);
      return {
        data: response.data,
      };
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

export const searchProdutoByNome = createAsyncThunk(
  'produtos/searchProdutoByNome',
  async (nome) => {
    try {
      const url = `/${baseProdutosURL}/query?nome=${nome}}`;
      const response = await axiosInstance.get(url);
      return {
        data: response.data,
      };
    } catch (error) { return error.message; }
  },
);

export const searchProdutoByCodigo = createAsyncThunk(
  'produtos/searchProdutoByCodigo',
  async (codigo) => {
    try {
      const url = `/${baseProdutosURL}/query?codigo=${codigo}`;
      const response = await axiosInstance.get(url);
      return {
        data: response.data,
      };
    } catch (error) { return error.message; }
  },
);

export const searchProdutoByFabricante = createAsyncThunk(
  'produtos/searchProdutoByFabricante',
  async (fabricante) => {
    try {
      const url = `/${baseProdutosURL}/query?fabricante=${fabricante}}`;
      const response = await axiosInstance.get(url);
      return {
        data: response.data,
      };
    } catch (error) { return error.message; }
  },
);

export const searchProdutotByPreco = createAsyncThunk(
  'produtos/searchProdutotByPreco',
  async (preco, operador) => {
    try {
      const url = `/${baseProdutosURL}/query?price=${preco}&operador=${operador}`;
      const response = await axiosInstance.get(url);
      return {
        data: response.data,
      };
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
      // PRODUTOS
      // Get Produtos
      .addCase(
        getProdutos.fulfilled,
        (state, action) => {
          state.status = fetchStatus.SUCCESS;
          state.produtos = { ...action.payload };
        },
      )
      .addCase(getProdutos.pending, (state) => { state.status = fetchStatus.PENDING; })
      .addCase(getProdutos.rejected, (state, action) => {
        state.status = fetchStatus.ERROR;
        state.error = action.error.message || 'Something went wrong';
      })
      // Preço
      .addCase(searchProdutotByPreco.fulfilled, (state, action) => {
        state.status = fetchStatus.SUCCESS;
        state.produtos = action.payload;
      })
      .addCase(searchProdutotByPreco.pending, (state) => { state.status = fetchStatus.PENDING; })
      .addCase(searchProdutotByPreco.rejected, (state, action) => {
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
      .addCase(searchProdutoByFabricante.fulfilled, (state, action) => {
        state.status = fetchStatus.SUCCESS;
        state.produtos = action.payload;
      })
      .addCase(searchProdutoByFabricante.pending, (state) => { state.status = 'loading'; })
      .addCase(searchProdutoByFabricante.rejected, (state, action) => {
        state.status = fetchStatus.FAILURE;
        state.error = action.error.message || 'Algo deu errado';
      });
  },
});

export const produtosReducer = produtosSlice.reducer;
