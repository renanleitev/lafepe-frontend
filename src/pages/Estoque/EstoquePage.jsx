import { useState } from 'react';
import EstoquesTable from '../../components/Estoque/EstoquesTable';
import CreateEstoque from '../../components/Estoque/CreateEstoque';
import EditEstoque from '../../components/Estoque/EditEstoque';
import DeleteEstoque from '../../components/Estoque/DeleteEstoque';
import TabHeader from '../../components/TabHeader/TabHeader';

function RenderPage(option) {
  switch (option) {
    case 0:
      return <EstoquesTable />;
    case 1:
      return <CreateEstoque />;
    case 2:
      return <EditEstoque />;
    case 3:
      return <DeleteEstoque />;
    default:
      return <EstoquesTable />;
  }
}

function EstoquePage() {
  const [option, setOption] = useState(0);
  return (
    <div>
      <TabHeader page="Estoque" option={option} setOption={setOption} />
      {RenderPage(option)}
    </div>
  );
}

export default EstoquePage;
