import { combineReducers } from 'redux';
import { estoquesReducer } from './estoques/reducer';
import { registrosReducer } from './registros/reducer';
import { produtosReducer } from './produtos/reducer';

const rootReducer = combineReducers({
  estoques: estoquesReducer,
  produtos: produtosReducer,
  registros: registrosReducer,
});

export default rootReducer;
