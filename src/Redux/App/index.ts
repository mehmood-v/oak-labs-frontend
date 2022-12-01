import { createSlice } from "@reduxjs/toolkit";
import { initialStateTypes, finalStateTypes } from "types";

const initialState: initialStateTypes = {
  isAuthorized: false,
  loading: false,
  hasErrors: false,
  data: [{ name: "", phases: [], startupId: 0 }],
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    requestStart: (state) => {
      state.loading = true;
    },
    requestCompleted: (state) => {
      state.loading = false;
    },

    requestSuccess(state, { payload }) {
      state.data = payload;
      state.loading = false;
      state.hasErrors = false;
    },

    requestFailure(state) {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const data = (state: finalStateTypes) => state.app.data;
export const loading = (state: finalStateTypes) => state.app.loading;

export const {
  requestStart,
  requestSuccess,
  requestFailure,
  requestCompleted,
} = appReducer.actions;

export default appReducer.reducer;
