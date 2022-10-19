export interface IGameDashboardProps {
  currAccount: string | null;
  handleCopyToClipboard(str: string): void;
}

export interface IGameDashboardBodyItemProps {
  title: string;
  value: string;
  handleCopyToClipboard(str: string): void;
}
