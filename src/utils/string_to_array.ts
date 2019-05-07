export default (val: string, sep: string) => {
  return val ? val.split(sep) : [];
};
