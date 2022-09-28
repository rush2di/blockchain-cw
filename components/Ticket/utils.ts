const progressPercent = (min: number, curr: number): number => {
  const percentage = Math.round((curr / min) * 100);
  return percentage > 100 ? 100 : percentage;
};

export { progressPercent };
