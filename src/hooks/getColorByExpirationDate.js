export default function getColorByExpirationDate(expirationDate) {
  const currentDate = new Date();
  const date = new Date(expirationDate);

  // Calculate the difference in months
  const diffTime = date - currentDate;
  const diffMonths = diffTime / (1000 * 60 * 60 * 24 * 30);

  if (diffMonths < 0) {
    return 'red'; // Validade já passou
  } if (diffMonths <= 1) {
    return 'darkorchid'; // Validade vence em 1 mês
  } if (diffMonths <= 6) {
    return 'orange'; // Validade vence em 6 meses
  } if (diffMonths <= 12) {
    return '#49c74a'; // Validade vence em 12 meses
  }
  return '#49c74a'; // Validade vence em mais de 12 meses
}
