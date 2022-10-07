const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const getSessionStorageData = (key: string) => {
  const json = sessionStorage.getItem(key);
  return JSON.parse(json as string);
};

export { classNames };
