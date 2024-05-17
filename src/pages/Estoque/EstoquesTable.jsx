import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { getEstoques } from '../../store/modules/estoques/reducer';
import Loading from '../../components/Loading/LoadingContainer';
import fetchStatus from '../../config/fetchStatus';

function EstoquesTable() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.estoques.status);
  const nodes = useSelector((state) => state.estoques.estoques) || [];
  const data = { nodes };

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
        background-color: #eaf5fd;
      `,
      Row: `
        &:nth-of-type(odd) {
          background-color: #d2e9fb;
        }

        &:nth-of-type(even) {
          background-color: #eaf5fd;
        }
      `,
    },
  ]);

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
  ];

  useEffect(() => {
    dispatch(getEstoques());
  }, [dispatch]);

  return (
    <div>
      {isLoading === fetchStatus.PENDING && nodes.length > 1
        ? <Loading /> : <CompactTable data={data} columns={columns} theme={theme} />}
    </div>
  );
}

export default EstoquesTable;
