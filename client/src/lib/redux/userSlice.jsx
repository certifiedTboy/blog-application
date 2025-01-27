import { createSlice } from "@reduxjs/toolkit";
// import { useState } from 'react';

// const [firstName, setFirstName] = useState([{lksfkss:"sgsgsklg"}])

// // payload
// setFirstName("Emmanuel")

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },

    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export default userSlice.reducer;
export const { setCurrentUser, clearCurrentUser } = userSlice.actions;
