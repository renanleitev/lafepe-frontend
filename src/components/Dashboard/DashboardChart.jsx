import { BarChart } from '@mui/x-charts/BarChart';
import PropTypes from 'prop-types';

export default function DashboardChart({ series, labels }) {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: labels }]}
      series={series}
      width={800}
      height={500}
    />
  );
}

DashboardChart.propTypes = {
  series: PropTypes.arrayOf(PropTypes.shape(
    { data: PropTypes.arrayOf(PropTypes.number).isRequired },
  )).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};
