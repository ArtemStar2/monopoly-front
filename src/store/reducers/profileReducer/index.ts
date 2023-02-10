import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from './ActionCreators';
import { ProfileState } from './Interfaces';

const initialState: ProfileState = {
  // walletAddress: '0x8243E8a9293C266A248e684031480fDaC84e4e12',
  walletAddress: '',
  balanceETH: 0,
  balanceUSD: 0,
  isLoading: false,
  error: '',
  count: 0,
  username: '',
  avatar: '',
  score: 0,
  friends: Array(),
  id: 0,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // setWalletAddress: (state, action: PayloadAction<string>) => {
    //   state.walletAddress = action.payload;
    // },
    getUsersData: (state, ) => {
      return state;
    },
    setUsersData: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.balanceETH = parseInt(action.payload.balance);
      state.score = parseInt(action.payload.score);
      state.walletAddress = action.payload.walletAddress;
      state.friends = action.payload.friends;
    },
  }, // аналогично конструкции switch case
  extraReducers: {
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.error = '';
      // state.users = action.payload;
    },
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }, // для thunk обработки ошибок, закрузки, и успеха
});

export default profileSlice.reducer;
