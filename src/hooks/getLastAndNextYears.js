export default function getLastAndNextYears(period) {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let i = period; i > 0; i -= 1) {
    const year = currentYear - i;
    years.push({ label: year, value: year });
  }

  for (let i = 0; i <= period; i += 1) {
    const year = currentYear + i;
    years.push({ label: year, value: year });
  }

  return years;
}
