export const monthAverageCelcius = (monthDegrees) => {
  const sum = monthDegrees.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (sum / monthDegrees.length).toFixed(2);
};
