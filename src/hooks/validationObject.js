/* eslint-disable no-console */
export default function validationObject(obj) {
  // Obtenha as chaves do objeto
  const keys = Object.keys(obj);
  let result = false;

  // Use forEach para verificar se algum valor é uma string vazia ou zero
  keys.forEach((key) => {
    if (typeof obj[key] === 'string' && obj[key] === '') {
      console.log('string vazia', key);
      result = true;
    } else if (typeof obj[key] === 'number' && obj[key] === 0) {
      console.log('number vazio', key);
      result = true;
    } else if (obj[key] instanceof Date && !Date.parse(obj[key])) {
      console.log('date vazio', key);
      result = true;
    }
  });

  return result;
}
