import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../Table/Table';
import { getRegistros } from '../../store/modules/registros/reducer';
import Loading from '../Loading/LoadingContainer';
import fetchStatus from '../../config/fetchStatus';
import convertObjectToArray from '../../hooks/convertObjectToArray';
import convertDate from '../../hooks/convertDate';

function ProdutosTable() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.registros.status);
  const registros = convertObjectToArray(useSelector((state) => state.registros.registros)) || [];

  const columns = [
    { label: 'Entrada Quarentena', renderCell: (item) => item.entradaQuarentena },
    { label: 'Saida Quarentena', renderCell: (item) => item.saidaQuarentena },
    { label: 'Saldo Quarentena Inicial', renderCell: (item) => item.saldoQuarentenaInicial },
    { label: 'Saldo Quarentena Final', renderCell: (item) => item.saldoQuarentenaFinal },
    { label: 'Entrada Quantidade', renderCell: (item) => item.entradaQuantidade },
    { label: 'Saida Quantidade', renderCell: (item) => item.saidaQuantidade },
    { label: 'Saldo Quantidade Inicial', renderCell: (item) => item.saldoQuantidadeInicial },
    { label: 'Saldo Quantidade Final', renderCell: (item) => item.saldoQuantidadeFinal },
    { label: 'Data', renderCell: (item) => convertDate(item.data) },
  ];

  useEffect(() => {
    dispatch(getRegistros());
  }, [dispatch]);

  return (
    <div>
      {isLoading === fetchStatus.PENDING && registros.length > 1
        ? <Loading /> : (
          <Table
            data={registros}
            columns={columns}
          />
        )}
    </div>
  );
}

export default ProdutosTable;
