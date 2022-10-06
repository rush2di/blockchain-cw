const _STORAGE_KEY = "isDappApproved";

interface setStorageSavedApprovalParams {
  account: string | null;
  isApproved: boolean;
}

export const setStorageSavedApproval = ({
  account,
  isApproved,
}: setStorageSavedApprovalParams) => {
  const newData = { account, isApproved };
  sessionStorage.setItem(_STORAGE_KEY, JSON.stringify(newData));
};

export const getStorageSavedApproval = () => {
  const json = sessionStorage.getItem(_STORAGE_KEY);
  return JSON.parse(json as string);
};

export const mmAlertLogger = () => {
  console.log(
    "%cPlease install MetaMask extension from https://metamask.io",
    "font-weight: bold; font-size: 16px;color:yellow"
  );
};
