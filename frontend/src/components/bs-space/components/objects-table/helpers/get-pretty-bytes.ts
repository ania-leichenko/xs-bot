import prettyBytes from 'pretty-bytes';

const getPrettyBytes = (bytes: number): string => {
  return prettyBytes(bytes);
};

export { getPrettyBytes };
