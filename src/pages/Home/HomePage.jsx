import { Pagination, Box } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ChartsEstoquesPage from './ChartsEstoquesPage';
import ChartsRegistrosPage from './ChartsRegistrosPage';
import CardsPage from './CardsPage';
import { VerticalContainer } from '../../config/GlobalStyle';

function RenderPage({ page }) {
  switch (page) {
    case 1:
      return <CardsPage />;
    case 2:
      return <ChartsEstoquesPage />;
    case 3:
      return <ChartsRegistrosPage />;
    default:
      return null;
  }
}

RenderPage.propTypes = {
  page: PropTypes.number.isRequired,
};

export default function HomePage() {
  const [page, setPage] = useState(1);

  return (
    <VerticalContainer style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <Box sx={{ height: '70vh' }}>
        <RenderPage page={page} />
      </Box>
      <Pagination count={3} page={page} onChange={(e, value) => setPage(value)} />
    </VerticalContainer>
  );
}
