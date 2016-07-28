export default t => {
  const res = t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  return res;
};
