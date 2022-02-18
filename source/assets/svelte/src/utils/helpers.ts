import prettyFormat from 'pretty-format';

export const format = (value: unknown): string =>
  typeof value === 'function'
    ? value.toString()
    : prettyFormat(value, { min: true });
