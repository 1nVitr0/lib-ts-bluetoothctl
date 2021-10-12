export const outputToJson = <T>(str: string): T => {
  const output = str
    .split('\n\t')
    .filter((line) => /[A-z]*: /g.test(line))
    .map((line) => line.split(': '))
    .map(([key, value]) => ['yes', 'no'].includes(value)
      ? [key, value === 'yes']
      : [key, value]
    );

  return Object.fromEntries(output);
};
