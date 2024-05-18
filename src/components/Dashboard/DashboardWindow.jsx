import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';

function DashboardWindow({ title, quantity }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {quantity}
        </Typography>
      </CardContent>
    </Card>
  );
}

DashboardWindow.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default DashboardWindow;
