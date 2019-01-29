const dollars = num => `$${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,')}`;
export { dollars };
export default {
  dollars,
};
