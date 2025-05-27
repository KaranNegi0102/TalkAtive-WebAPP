"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface USER_DATA_TYPE {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  friends: [] | null,
  token: string | null;
}

interface TYPE_OF_INITIAL_STATE_TYPE {
  isLoggedIn: boolean;
  token: string | null;
  userData: USER_DATA_TYPE | null;
  loading: boolean;
  error: string | null;
}

const initialState: TYPE_OF_INITIAL_STATE_TYPE = {
  isLoggedIn: false,
  token: null,
  userData: null,
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/auth/checkUser", {
        withCredentials: true,
      });
  
      console.log("response in fetchUserData --> ", response);
      return response.data;

    } catch (error: any) {
      console.log("error in fetchUserData --> ", error);
      return rejectWithValue(error?.response?.data || "Something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<USER_DATA_TYPE>) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
      state.loading = false;
      console.log("action Payload in login --> ", action.payload);
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.userData = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("fetching user data in pending state");
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<USER_DATA_TYPE>) => {
          state.loading = false;
          state.isLoggedIn = true;
          state.userData = action.payload;
          console.log("fetching user data in fulfilled state",action.payload);
        }
      )
      .addCase(
        fetchUserData.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.isLoggedIn = false;
          state.error = action.payload as string;
          console.log("fetching user data in rejected state");
        }
      );
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
