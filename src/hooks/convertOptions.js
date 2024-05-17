const convertOptions = (array) => {
  const options = [];
  array.forEach((item) => {
    options.push({ label: item.nome, item });
  });
  return options;
};

export default convertOptions;
