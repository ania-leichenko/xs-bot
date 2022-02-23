const generateCsv = (content: string[][], fileName: string): void => {
  const a = document.createElement('a');

  const csvContent = content.map((e) => e.join(' ')).join('\n');

  a.href = URL.createObjectURL(
    new Blob([csvContent], {
      type: 'text/csv;encoding:utf-8',
    }),
  );

  a.setAttribute('download', fileName);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export { generateCsv };
