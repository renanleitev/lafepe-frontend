import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProdutos } from '../../store/modules/produtos/reducer';
import {
  getEstoques,
  getEstoqueByValidadeVencidos,
  getEstoqueByValidade1Mes,
  getEstoqueByValidade6Meses,
  getEstoqueByValidade12Meses,
  getEstoqueByPrejuizoSaldoAtual,
} from '../../store/modules/estoques/reducer';
import { getRegistros } from '../../store/modules/registros/reducer';
import { VerticalContainer, HorizontalContainer } from '../../config/GlobalStyle';
import DashboardWindow from '../../components/Dashboard/DashboardWindow';

function HomePage() {
  const dispatch = useDispatch();
  const produtos = useSelector((state) => state.produtos.produtos) || [];
  const estoques = useSelector((state) => state.estoques.estoques) || [];
  const estoquesVencidos = useSelector((state) => state.estoques.estoquesVencidos) || [];
  const estoquesPositivos = useSelector((state) => state.estoques.estoquesPositivos) || [];
  const estoquesNegativos = useSelector((state) => state.estoques.estoquesNegativos) || [];
  const estoquesValidade1Mes = useSelector(
    (state) => state.estoques.estoquesValidade1Mes,
  ) || [];
  const estoquesValidade6Meses = useSelector(
    (state) => state.estoques.estoquesValidade6Meses,
  ) || [];
  const estoquesValidade12Meses = useSelector(
    (state) => state.estoques.estoquesValidade12Meses,
  ) || [];
  const estoquesPrejuizoSaldoAtual = useSelector(
    (state) => Number.parseFloat(state.estoques.estoquesPrejuizoSaldoAtual).toFixed(2).replace('.', ','),
  ) || 0;
  const registros = useSelector((state) => state.registros.registros) || [];

  useEffect(() => {
    dispatch(getProdutos());
    dispatch(getEstoques());
    dispatch(getRegistros());
    dispatch(getEstoqueByValidadeVencidos());
    dispatch(getEstoqueByValidade1Mes());
    dispatch(getEstoqueByValidade6Meses());
    dispatch(getEstoqueByValidade12Meses());
    dispatch(getEstoqueByPrejuizoSaldoAtual());
  }, [dispatch]);

  return (
    <VerticalContainer style={{ paddingTop: '2rem' }}>
      <h1 className="title">Dashboard</h1>
      <VerticalContainer style={{ alignItems: 'flex-start' }}>
        <h2>Visão Geral</h2>
        <HorizontalContainer>
          <DashboardWindow
            title="Produtos"
            quantity={produtos?.length}
            link="/produtos"
          />
          <DashboardWindow
            title="Estoques"
            quantity={estoques?.length}
            link="/estoques"
          />
          <DashboardWindow
            title="Registros"
            quantity={registros?.length}
            link="/registros"
          />
        </HorizontalContainer>
        <h2>Validade dos Estoques</h2>
        <HorizontalContainer>
          <DashboardWindow
            title="Produtos Vencidos"
            quantity={estoquesVencidos?.length}
            link="/estoques?vencidos=TRUE"
          />
          <DashboardWindow
            title="Validade 1 Mês"
            quantity={estoquesValidade1Mes?.length}
            link="/estoques?validade=1"
          />
          <DashboardWindow
            title="Validade 6 Meses"
            quantity={estoquesValidade6Meses?.length}
            link="/estoques?validade=6"
          />
          <DashboardWindow
            title="Validade 12 Meses"
            quantity={estoquesValidade12Meses?.length}
            link="/estoques?validade=12"
          />
        </HorizontalContainer>
        <h2>Quantidade dos Estoques</h2>
        <HorizontalContainer>
          <DashboardWindow
            title="Estoque Sobrando"
            quantity={estoquesPositivos?.length}
            link="/estoques?saldo=POSITIVO"
          />
          <DashboardWindow
            title="Estoque Faltando"
            quantity={estoquesNegativos?.length}
            link="/estoques?saldo=NEGATIVO"
          />
          <DashboardWindow
            title="Prejuízo (R$) - Produtos Vencidos"
            quantity={estoquesPrejuizoSaldoAtual}
            link="/estoques?vencidos=TRUE"
          />
        </HorizontalContainer>
      </VerticalContainer>
    </VerticalContainer>
  );
}

export default HomePage;
