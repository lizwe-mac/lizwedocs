import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import resService from "./resService";

const res = JSON.parse(localStorage.getItem("res"));
const initialState = {
  res: res ? res : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new goal
export const createInfo = createAsyncThunk(
  "res/createInfo",
  async (resInfo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resService.createInfo(resInfo, token);
    } catch (error) {
      console.log("I got here instead");

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resSlice = createSlice({
  name: "res",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("action.payload", action.payload);
        state.res = action.payload;
      })
      .addCase(createInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = resSlice.actions;
export default resSlice.reducer;
