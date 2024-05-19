const convertDate = (date) => date.split('-').reverse().join('/');

export const convertDateReverse = (date) => date.split('/').reverse().join('-');

export function getCurrentDateFormatted() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // getMonth() retorna o mês de 0 a 11, por isso adicionamos 1
  const day = String(today.getDate()).padStart(2, '0'); // getDate() retorna o dia do mês

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export default convertDate;
