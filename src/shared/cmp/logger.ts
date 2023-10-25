export const isDev = import.meta.env.DEV;

export const envLog = (...data: unknown[]) => {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.log(...data);
  }
};
