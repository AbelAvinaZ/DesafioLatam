

// Formatea el total a formato de moneda

const formattedTotal = (valor) => {
  const formatter = new Intl.NumberFormat ('en-us', { style: 'currency', currency: 'USD' });
  return formatter.format(valor);
}










export default formattedTotal;