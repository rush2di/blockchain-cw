export interface TicketProps extends TicketProgressBarProps, TicketButtonsProps {
  title: string;
  cover: `https://source.unsplash.com/${string}`;
  content: TicketContentProps;
}

export interface TicketButtonsProps {
  disabled: boolean;
  handleClick: (tokenAddress: string, decimals: number) => void;
}

export interface TicketContentProps {
  intro: string;
  heading: string;
  winOutcome: string;
  loseOutcome: string;
  entryPrice: number;
  prevPrice: number;
}

export interface TicketProgressBarProps {
  minimumPlayers: number;
  currentPlayers: number;
}
