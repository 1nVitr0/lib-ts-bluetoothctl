const firstLowerCase = (str: string): string => `${str.charAt(0).toLowerCase()}${str.substring(1)}`;

export const outputToJson = <T>(str: string): T => {
  const output = str
    .split('\n\t')
    .filter((line) => /[A-z]*: /g.test(line))
    .map((line) => line.split(': '))
    .map(([key, value]) => ['yes', 'no'].includes(value)
      ? [firstLowerCase(key), value === 'yes']
      : [firstLowerCase(key), value]
    );

  return Object.fromEntries(output);
};
