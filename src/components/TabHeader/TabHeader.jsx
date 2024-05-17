import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

export default function TabHeader({ page, option, setOption }) {
  const handleChange = (event, newOption) => {
    setOption(newOption);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={option} onChange={handleChange} centered aria-label="basic tabs example">
          <Tab label={`Visualizar ${page}s`} />
          <Tab label={`Criar ${page}`} />
          <Tab label={`Editar ${page}`} />
          <Tab label={`Deletar ${page}`} />
        </Tabs>
      </Box>
    </Box>
  );
}

TabHeader.propTypes = {
  page: PropTypes.string.isRequired,
  option: PropTypes.number.isRequired,
  setOption: PropTypes.func.isRequired,
};
