import PropTypes from 'prop-types';

import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import Loading from '../Loading/LoadingContainer';
import fetchStatus from '../../config/fetchStatus';

function Row(props) {
  const { row } = props;

  return (
    <TableRow>
      <TableCell component="th" scope="row" width="10%">
        {row.codigo}
      </TableCell>
      <TableCell component="th" scope="row" width="10%">
        {row.nome}
      </TableCell>
      <TableCell component="th" scope="row" width="10%">
        {row.fabricante}
      </TableCell>
      <TableCell component="th" scope="row" align="right" width="10%">
        {row.precoUnitario}
      </TableCell>
    </TableRow>
  );
}

Row.propTypes = {
  row: PropTypes.shape(
    {
      codigo: PropTypes.string.isRequired,
      nome: PropTypes.string.isRequired,
      fabricante: PropTypes.string.isRequired,
      precoUnitario: PropTypes.number.isRequired,
    },
  ).isRequired,
};

function ProdutosTable({ produtos, isLoading }) {
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
                  <TableCell>Código</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Fabricante</TableCell>
                  <TableCell align="right">Preço Unitário (R$)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {produtos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <Row key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={produtos.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage="Linhas por página"
              page={page}
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

ProdutosTable.propTypes = {
  isLoading: PropTypes.string.isRequired,
  produtos: PropTypes.arrayOf(PropTypes.shape(
    {
      codigo: PropTypes.string.isRequired,
      nome: PropTypes.string.isRequired,
      fabricante: PropTypes.string.isRequired,
      precoUnitario: PropTypes.number.isRequired,
    },
  )).isRequired,
};

export default ProdutosTable;
