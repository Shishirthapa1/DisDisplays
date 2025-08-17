import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigUserState {
  token: string | null;
  user: object | null;
}

const initialState: ConfigUserState = {
  token: null,
  user: null,
};

const configUser = createSlice({
  name: "configUser",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<object | null>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    resetConfigUser() {
      return { user: null, token: null };
    },
  },
});

export default configUser.reducer;
export const { setUser, setToken, resetConfigUser } = configUser.actions;
