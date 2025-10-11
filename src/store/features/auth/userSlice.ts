import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

interface User {
  id: number;
  email: string;
  username: string;
  avatar: string;
  createdAt: string;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isLoggedIn = true;
        state.user = payload.user;
        state.token = payload.token;
      }
    );
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
