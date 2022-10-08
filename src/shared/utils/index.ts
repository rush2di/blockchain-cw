import { isBrowser } from "shared/constants";

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

const getSessionStorageData = (key: string) => {
  if (!isBrowser) return;

  const json = sessionStorage.getItem(key);
  return JSON.parse(json as string);
};

const removeSessionStorageData = (key: string) => {
  if (!isBrowser) return;

  sessionStorage.removeItem(key);
};

export { classNames, getSessionStorageData, removeSessionStorageData };
