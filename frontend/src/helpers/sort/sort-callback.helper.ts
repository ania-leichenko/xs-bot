type ValueType = string | number | Date;

const sortCallback = (a: ValueType, b: ValueType): number => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

export { sortCallback };
