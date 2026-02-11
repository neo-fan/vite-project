import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  name: string | null;
}

const initialState: UserState = {
  token: null,
  name: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setUser(state, action: PayloadAction<UserState>) {
      // state = action.payload;
      Object.assign(state, action.payload);
    },
    clearUser(state) {
      state.token = null;
      state.name = null;
    },
  },
});

export const { setToken, setName, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
