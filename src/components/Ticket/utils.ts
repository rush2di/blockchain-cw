const progressPercent = (min: number, curr: number): number => {
  const percentage = Math.round((curr / min) * 100);
  return percentage > 100 ? 100 : percentage;
};

const tokenImageTransformer = (tokenName: string): string => {
  return `/assets/${tokenName.toLowerCase()}.png`;
};

const toUSDCurrencyString = (price: number): string => {
  return parseFloat(price.toFixed(2)).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export { progressPercent, tokenImageTransformer, toUSDCurrencyString };
