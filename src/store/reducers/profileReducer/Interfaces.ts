export interface ProfileState {
  walletAddress: string | null;
  balanceETH: number;
  balanceUSD: number;
  isLoading: boolean;
  error: string;
  count: number;
  username: string;
  avatar: string;
  score: number;
  friends: any;
  id: number
}

// export interface IUser {
//   id: number;
//   name: string;
//   email: string;
// }
