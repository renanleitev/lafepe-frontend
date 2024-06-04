import PropTypes from 'prop-types';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TablePagination } from '@mui/material';
import Loading from '../Loading/LoadingContainer';
import fetchStatus from '../../config/fetchStatus';
import convertDate from '../../hooks/convertDate';
import getColorByExpirationDate from '../../hooks/getColorByExpirationDate';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const columnWidth = '10%';

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell width={columnWidth}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" width={columnWidth}>
          {row.entrada}
        </TableCell>
        <TableCell component="th" scope="row" width={columnWidth}>
          {row.saida}
        </TableCell>
        <TableCell component="th" scope="row" width={columnWidth}>
          {row.saldoInicial}
        </TableCell>
        <TableCell component="th" scope="row" width={columnWidth}>
          {row.saldoFinal}
        </TableCell>
        <TableCell component="th" scope="row" width={columnWidth}>
          {convertDate(row.data)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Estoque
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Lote</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Quarentena</TableCell>
                    <TableCell>Unidade</TableCell>
                    <TableCell>Saldo Atual</TableCell>
                    <TableCell>Saldo Original</TableCell>
                    <TableCell>Validade</TableCell>
                    <TableCell>Código</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Preço Unitário (R$)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.estoque.lote}>
                    <TableCell component="th" scope="row">
                      {row.estoque.lote}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.estoque.quantidade}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.estoque.quarentena}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.estoque.unidade}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.estoque.saldoAtual}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.estoque.saldoOriginal}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Box sx={{ color: getColorByExpirationDate(row.estoque.validade) }}>
                        {convertDate(row.estoque.validade)}
                      </Box>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.estoque.produto.codigo}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.estoque.produto.nome}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {row.estoque.produto.precoUnitario}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape(
    {
      entrada: PropTypes.number.isRequired,
      saida: PropTypes.number.isRequired,
      saldoInicial: PropTypes.number.isRequired,
      saldoFinal: PropTypes.number.isRequired,
      data: PropTypes.string.isRequired,
      estoque: {
        lote: PropTypes.string.isRequired,
        quantidade: PropTypes.number.isRequired,
        unidade: PropTypes.string.isRequired,
        saldoAtual: PropTypes.number.isRequired,
        saldoOriginal: PropTypes.number.isRequired,
        validade: PropTypes.string.isRequired,
        produto: PropTypes.shape({
          codigo: PropTypes.string.isRequired,
          nome: PropTypes.string.isRequired,
          descricao: PropTypes.string.isRequired,
          precoUnitario: PropTypes.number.isRequired,
        }),
      },
    },
  ).isRequired,
};

function RegistrosTable({ registros, isLoading }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      {isLoading === fetchStatus.PENDING ? <Loading />
        : (
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Lote</TableCell>
                  <TableCell>Entrada</TableCell>
                  <TableCell>Saída</TableCell>
                  <TableCell>Saldo Inicial</TableCell>
                  <TableCell>Saldo Final</TableCell>
                  <TableCell>Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registros
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <Row key={row.id} row={row} />
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={registros.length}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="Linhas por página"
              slotProps={{
                select: {
                  'aria-label': 'Linhas por página',
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}
    </div>
  );
}

RegistrosTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  registros: PropTypes.arrayOf(PropTypes.shape(
    {
      entrada: PropTypes.number.isRequired,
      saida: PropTypes.number.isRequired,
      saldoInicial: PropTypes.number.isRequired,
      saldoFinal: PropTypes.number.isRequired,
      estoque: {
        lote: PropTypes.string.isRequired,
        quantidade: PropTypes.number.isRequired,
        unidade: PropTypes.string.isRequired,
        saldoAtual: PropTypes.number.isRequired,
        saldoOriginal: PropTypes.number.isRequired,
        validade: PropTypes.string.isRequired,
        produto: PropTypes.shape({
          codigo: PropTypes.string.isRequired,
          nome: PropTypes.string.isRequired,
          descricao: PropTypes.string.isRequired,
          precoUnitario: PropTypes.number.isRequired,
        }),
      },
    },
  )).isRequired,
};

export default RegistrosTable;
