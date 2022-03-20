const debounce = <A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number,
): ((args: A) => Promise<R>) => {
  let timer: ReturnType<typeof setTimeout>;

  return (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });
};

export { debounce };
