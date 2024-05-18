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

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.lote}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.quantidade}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.quarentena}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.unidade}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.saldoAtual}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.saldoOriginal}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          style={{
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}
        >
          {row.descricao}
        </TableCell>
        <TableCell component="th" scope="row" width="10%">
          <Box sx={{ color: getColorByExpirationDate(row.validade) }}>
            {convertDate(row.validade)}
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Produto
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Fabricante</TableCell>
                    <TableCell align="right">Preço Unitário (R$)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.produto.codigo}>
                    <TableCell component="th" scope="row">
                      {row.produto.codigo}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.produto.nome}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.produto.fabricante}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {row.produto.precoUnitario}
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
      lote: PropTypes.string.isRequired,
      quantidade: PropTypes.number.isRequired,
      quarentena: PropTypes.number.isRequired,
      unidade: PropTypes.string.isRequired,
      saldoAtual: PropTypes.number.isRequired,
      saldoOriginal: PropTypes.number.isRequired,
      validade: PropTypes.string.isRequired,
      descricao: PropTypes.string.isRequired,
      produto: PropTypes.shape({
        codigo: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
        fabricante: PropTypes.string.isRequired,
        precoUnitario: PropTypes.number.isRequired,
      }).isRequired,
    },
  ).isRequired,
};

function EstoquesTable({ estoques, isLoading }) {
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
                  <TableCell>Produto</TableCell>
                  <TableCell>Lote</TableCell>
                  <TableCell>Quantidade</TableCell>
                  <TableCell>Quarentena</TableCell>
                  <TableCell>Unidade</TableCell>
                  <TableCell>Saldo Atual</TableCell>
                  <TableCell>Saldo Original</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Validade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {estoques.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <Row key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={estoques.length}
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

EstoquesTable.propTypes = {
  isLoading: PropTypes.string.isRequired,
  estoques: PropTypes.arrayOf(PropTypes.shape(
    {
      lote: PropTypes.string.isRequired,
      quantidade: PropTypes.number.isRequired,
      unidade: PropTypes.string.isRequired,
      saldoAtual: PropTypes.number.isRequired,
      saldoOriginal: PropTypes.number.isRequired,
      validade: PropTypes.string.isRequired,
      descricao: PropTypes.string.isRequired,
      produto: PropTypes.shape({
        codigo: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
        fabricante: PropTypes.string.isRequired,
        precoUnitario: PropTypes.number.isRequired,
      }).isRequired,
    },
  )).isRequired,
};

export default EstoquesTable;
