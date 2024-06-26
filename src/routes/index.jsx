import { Routes, Route } from 'react-router-dom';
import ProdutoPage from '../pages/Produto/ProdutoPage';
import RegistroPage from '../pages/Registro/RegistroPage';
import EstoquePage from '../pages/Estoque/EstoquePage';
import Home from '../pages/Home/HomePage';
import Page404 from '../pages/Page404/Page404';

export default function RoutesController() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<ProdutoPage />} />
      <Route path="/estoques" element={<EstoquePage />} />
      <Route path="/registros" element={<RegistroPage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
