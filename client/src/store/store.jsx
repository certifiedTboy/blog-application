import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "../lib/redux/userSlice";
import { authApi } from "../lib/apis/authApis";
import { userApi } from "../lib/apis/userApis";

export const store = configureStore({
  reducer: {
    userState: userSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);
