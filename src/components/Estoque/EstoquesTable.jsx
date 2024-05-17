import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../Table/Table';
import { getEstoques } from '../../store/modules/estoques/reducer';
import Loading from '../Loading/LoadingContainer';
import fetchStatus from '../../config/fetchStatus';
import convertObjectToArray from '../../hooks/convertObjectToArray';

function EstoquesTable() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.estoques.status);
  const estoques = convertObjectToArray(useSelector((state) => state.estoques.estoques)) || [];

  const columns = [
    { label: 'Lote', renderCell: (item) => item.lote },
    { label: 'Quantidade', renderCell: (item) => item.quantidade },
    { label: 'Quarentena', renderCell: (item) => item.quantidade },
    { label: 'Unidade', renderCell: (item) => item.unidade },
    { label: 'Saldo Atual', renderCell: (item) => item.saldoAtual },
    { label: 'Saldo Original', renderCell: (item) => item.saldoOriginal },
    { label: 'Preço Unitário', renderCell: (item) => item.produto.precoUnitario },
    {
      label: 'Validade',
      renderCell: (item) => item.validade,
    },
    { label: 'Descrição', renderCell: (item) => item.descricao },
    { label: 'Produto', renderCell: (item) => item.produto.nome },
    { label: 'Fabricante', renderCell: (item) => item.produto.fabricante },
    { label: 'Preço Unitário', renderCell: (item) => item.produto.precoUnitario },
  ];

  useEffect(() => {
    dispatch(getEstoques());
  }, [dispatch]);

  return (
    <div>
      {isLoading === fetchStatus.PENDING && estoques.length > 1
        ? <Loading /> : (
          <Table
            data={estoques}
            columns={columns}
          />
        )}
    </div>
  );
}

export default EstoquesTable;
