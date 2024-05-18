export default function validationObject(obj) {
  // Obtenha as chaves do objeto
  const keys = Object.keys(obj);
  let result = false;

  // Use forEach para verificar se algum valor é uma string vazia ou zero
  keys.forEach((key) => {
    if (typeof obj[key] === 'string' && obj[key] === '') {
      result = true;
    } else if (typeof obj[key] === 'number' && obj[key] === 0) {
      result = true;
    } else if (obj[key] instanceof Date && !Date.parse(obj[key])) {
      result = true;
    }
  });

  return result;
}
