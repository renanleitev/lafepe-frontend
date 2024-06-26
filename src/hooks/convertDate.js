/**
 * Hook para converter uma data no formato PT-BR (e.g. 30/05/2024)
 */
const convertDate = (date) => {
  if (typeof date === 'string') {
    return date.split('-').reverse().join('/');
  }
  return date;
};

/**
 * Hook para converter uma data no formato US (e.g. 2024-05-30)
 */
export const convertDateReverse = (date) => {
  if (typeof date === 'string') {
    return date.split('/').reverse().join('-');
  }
  return date;
};

/**
 * Hook para converter a data atual no formato US (e.g. 2024-05-30)
 */
export function getCurrentDateFormatted() {
  const today = new Date();

  const year = today.getFullYear();
  // getMonth() retorna o mês de 0 a 11, por isso adicionamos 1
  const month = String(today.getMonth() + 1).padStart(2, '0');
  // getDate() retorna o dia do mês
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export default convertDate;
