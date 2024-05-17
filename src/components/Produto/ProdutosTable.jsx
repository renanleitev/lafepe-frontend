import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../Table/Table';
import { getProdutos } from '../../store/modules/produtos/reducer';
import Loading from '../Loading/LoadingContainer';
import fetchStatus from '../../config/fetchStatus';
import convertObjectToArray from '../../hooks/convertObjectToArray';

function ProdutosTable() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.produtos.status);
  const produtos = convertObjectToArray(useSelector((state) => state.produtos.produtos)) || [];

  const columns = [
    { label: 'Código', renderCell: (item) => item.codigo },
    { label: 'Nome', renderCell: (item) => item.nome },
    { label: 'Fabricante', renderCell: (item) => item.fabricante },
    { label: 'Preço', renderCell: (item) => item.precoUnitario },
  ];

  useEffect(() => {
    dispatch(getProdutos());
  }, [dispatch]);

  return (
    <div>
      {isLoading === fetchStatus.PENDING && produtos.length > 1
        ? <Loading /> : (
          <Table
            data={produtos}
            columns={columns}
          />
        )}
    </div>
  );
}

export default ProdutosTable;
