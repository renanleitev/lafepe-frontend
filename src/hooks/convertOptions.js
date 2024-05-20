/**
 * Hook para converter um array em um array de objetos, com label e item (para usar no Select)
 */
const convertOptions = (array, key) => {
  const options = [];
  array.forEach((item) => {
    options.push({ label: item[key].toString(), item });
  });
  return options;
};

export default convertOptions;
