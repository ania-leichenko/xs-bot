const transformOperationSystemName = (operationSystemName: string): string => {
  return operationSystemName
    .split('-')
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(' ');
};

export { transformOperationSystemName };
