import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import goalReducer from "../features/goals/goalSlice";
import infoSlice from "../features/Info/infoSlice";
import resSlice from "../features/recepient/resSlice";
import itemSlice from "../features/items/itemSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    info: infoSlice,
    res: resSlice,
    item: itemSlice,
  },
});
