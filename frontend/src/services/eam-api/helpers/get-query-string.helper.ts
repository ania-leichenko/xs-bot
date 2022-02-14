const getQueryString = (params: Record<string, string | number>): string => {
  const queryEntries = Object.entries(params).map(
    (item) => `${item[0]}=${item[1]}`,
  );
  return `/?${queryEntries.join('&')}`;
};

export { getQueryString };
