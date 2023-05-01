import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import Axios from "axios";

const url = "http://localhost:3000/users/login";
const user = JSON.parse(localStorage.getItem("user")) || null;

export const logInHandler = createAsyncThunk(
  "/login",
  async (user, ThunkAPI) => {
    try{
      let guest = JSON.parse(localStorage.getItem("guest")) || false;
      if(guest){
        user["guest"]=guest
      }
      localStorage.removeItem("guest")
      const res = await Axios.post(url, user);
      let userData = res.data;
      localStorage.setItem("user",JSON.stringify(userData))
      return userData
    }
    catch (err){
        return ThunkAPI.rejectWithValue(err.message)
    }
  }
);




export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: user,
    errorMessage: "",
    isLoading: false,
    error: false,
    signed: false,
  },
  reducers: {
    updatePhoneOrAddress:(state,action)=>{
      if(action.payload.phone){
      state.user.phone=action?.payload?.phone}
      if(action.payload.address){
      state.user.address=action?.payload?.address}
      localStorage.removeItem("user")
      localStorage.setItem("user",JSON.stringify(state.user))
    },
    reset: (state) => {
      state.errorMessage = "";
      state.isLoading = false;
      state.error = false;
      state.signed = false;
    },
    logOut:(state)=>{
      state.user=null
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInHandler.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logInHandler.fulfilled, (state, action) => {
        state.signed=true
        state.user = action.payload;
      })
      .addCase(logInHandler.rejected, (state, action) => {
        state.error = true;
      })
  },
});

export const { reset,logOut,updatePhoneOrAddress } = userSlice.actions;
export const u = (state) => state.user.user;
export const e = (state) => state.user.error;
export const em = (state) => state.user.errorMessage;
export const l = (state) => state.user.isLoading;
export const sf = (state) => state.user.signed;

export default userSlice.reducer;
