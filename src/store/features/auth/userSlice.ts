import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
}

export enum STATUS {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  FAILURE = "failure",
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  status: STATUS;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  status: STATUS.IDLE,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = STATUS.LOADING;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.status = STATUS.SUCCESS;
      state.user = action.payload;
      state.error = null;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.status = STATUS.FAILURE;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.status = STATUS.IDLE;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logout } =
  userSlice.actions;

export default userSlice.reducer;
