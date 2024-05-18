import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as colors from '../../config/colors';

const StyledLink = styled(Link)`
  color: ${colors.primaryDarkColor};
`;

function DashboardWindow({ title, quantity, link }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <StyledLink to={link}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {quantity}
          </Typography>
        </CardContent>
      </StyledLink>
    </Card>
  );
}

DashboardWindow.propTypes = {
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  link: PropTypes.string.isRequired,
};

export default DashboardWindow;
