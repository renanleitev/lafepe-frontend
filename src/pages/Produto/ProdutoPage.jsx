import { useState } from 'react';
import SearchProduto from '../../components/Produto/SearchProduto';
import CreateProduto from '../../components/Produto/CreateProduto';
import EditProduto from '../../components/Produto/EditProduto';
import DeleteProduto from '../../components/Produto/DeleteProduto';
import TabHeader from '../../components/TabHeader/TabHeader';

function RenderPage(option) {
  switch (option) {
    case 0:
      return <SearchProduto />;
    case 1:
      return <CreateProduto />;
    case 2:
      return <EditProduto />;
    case 3:
      return <DeleteProduto />;
    default:
      return <SearchProduto />;
  }
}

function ProdutoPage() {
  const [option, setOption] = useState(0);
  return (
    <div>
      <TabHeader page="Produto" option={option} setOption={setOption} />
      {RenderPage(option)}
    </div>
  );
}

export default ProdutoPage;
