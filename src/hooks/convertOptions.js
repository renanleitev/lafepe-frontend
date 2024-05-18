const convertOptions = (array, key) => {
  const options = [];
  array.forEach((item) => {
    options.push({ label: item[key].toString(), item });
  });
  return options;
};

export default convertOptions;
