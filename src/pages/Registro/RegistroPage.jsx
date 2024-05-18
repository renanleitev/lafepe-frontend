import { useState } from 'react';
import SearchRegistro from '../../components/Registro/SearchRegistro';
import CreateRegistro from '../../components/Registro/CreateRegistro';
import EditRegistro from '../../components/Registro/EditRegistro';
import DeleteRegistro from '../../components/Registro/DeleteRegistro';
import TabHeader from '../../components/TabHeader/TabHeader';

function RenderPage(option) {
  switch (option) {
    case 0:
      return <SearchRegistro />;
    case 1:
      return <CreateRegistro />;
    case 2:
      return <EditRegistro />;
    case 3:
      return <DeleteRegistro />;
    default:
      return <SearchRegistro />;
  }
}

function RegistroPage() {
  const [option, setOption] = useState(0);
  return (
    <div>
      <TabHeader page="Registro" option={option} setOption={setOption} />
      {RenderPage(option)}
    </div>
  );
}

export default RegistroPage;
