import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

import authSlice, { authSuccess, getCurrentUser } from "./authSlice/authSlice";

import { isEmpty } from "../utils/Utils";

let store;

const Root = ({ children, initialState = {} }, props) => {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth: authSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    ...initialState,
  });

  if (!isEmpty(localStorage.getItem("token"))) {
    store.dispatch(authSuccess(localStorage.getItem("token")));
    store.dispatch(getCurrentUser());
  }

  return <Provider store={store}>{children}</Provider>;
};

export { store };

export default Root;
