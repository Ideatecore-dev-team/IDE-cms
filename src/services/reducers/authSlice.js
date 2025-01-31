import { createSlice } from "@reduxjs/toolkit";

const getInitialUserInfo = () => {
  try {
    const userInfoString = localStorage.getItem("userInfo");
    return userInfoString ? JSON.parse(userInfoString) : null;
  } catch (error) {
    console.error("Error parsing userInfo from localStorage:", error);
    return null;
  }
};

const initialState = {
  userInfo: getInitialUserInfo(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    removeUserInfo: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUserInfo, removeUserInfo } = authSlice.actions;

export default authSlice.reducer;
