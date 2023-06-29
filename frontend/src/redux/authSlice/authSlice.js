import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance, { setAxiosAuthToken } from "../../utils/axiosInstance";
import { toastOnError } from "../../utils/Utils";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosInstance.post("auth/token/login/", userData);
      const { auth_token } = req.data;
      setAxiosAuthToken(auth_token);
      dispatch(authSuccess(auth_token));
      dispatch(getCurrentUser());
      toast.success("Login Success");
    } catch (error) {
      toastOnError(error);
      console.log(error);
      dispatch(unSetCurrentUser());
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSuccess = createAsyncThunk("auth/setToken", async (token) => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  return token;
});

export const getCurrentUser = createAsyncThunk(
  "auth/getUser",

  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("auth/users/me/");
      dispatch(setCurrentUser(response.data));
    } catch (error) {
      dispatch(logout());
      toastOnError(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const setCurrentUser = createAsyncThunk(
  "auth/setUser",

  async (user, { dispatch }) => {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
);

export const unSetCurrentUser = createAsyncThunk(
  "auth/unSetUser",

  async (_, { dispatch }) => {
    setAxiosAuthToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
);

export const logout = createAsyncThunk(
  "auth/logout",

  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/token/logout/");
      dispatch(unSetCurrentUser());
      toast.success("Logout successful.");
    } catch (error) {
      dispatch(unSetCurrentUser());
      toastOnError(error);
      return rejectWithValue(error);
    }
  }
);

export const CreateUser = createAsyncThunk(
  "auth/Register",
  async (userCred, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/users/", userCred);
      toast.success("Account Created successful.");
      return response.data;
    } catch (error) {
      toastOnError(error);
      return rejectWithValue(error);
    }
  }
);

export const UpdateUser = createAsyncThunk(
  "auth/updateUser",
  async (user, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("auth/users/me/", user);
      toast.success("Updated successfully.");
      dispatch(setCurrentUser(response.data));
      return response.data;
    } catch (error) {
      toastOnError(error);
      return rejectWithValue(error);
    }
  }
);

export const SetNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async (userPassword, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "auth/users/set_password/",
        userPassword
      );
      toast.success("Password Changed successfully.");
      return response.data;
    } catch (error) {
      toastOnError(error);
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
  token: "",
  AuthSuccessLoading: false,
};
const SiteSettingSlice = createSlice({
  name: "siteSetting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = "";
      })
      .addCase(authSuccess.pending, (state, action) => {
        state.AuthSuccessLoading = true;
      })
      .addCase(authSuccess.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.loading = false;
        state.AuthSuccessLoading = false;
      })
      .addCase(setCurrentUser.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(unSetCurrentUser.fulfilled, (state, action) => {
        return initialState;
      });
  },
});

export default SiteSettingSlice.reducer;
