import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const getCart = createAsyncThunk(
  "cart/getCart",
  async (args, thunkAPI) => {
    try {
      let guest =JSON.parse(localStorage.getItem("guest"))
      let res = await axios.get(`https://mern-ecommerce-app-42rq.onrender.com/cart/${args || guest.userId}`); 
      return res.data || null;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (args, thunkAPI) => {
    try {
      
      let guestId =JSON.parse(localStorage.getItem("guest"))  
      if (args.userId || guestId) {
        let post = await axios.post(`https://mern-ecommerce-app-42rq.onrender.com/cart`, {userId:args.userId || guestId.userId,prodDetails:args.prodDetails});
        let res = await axios.get(`https://mern-ecommerce-app-42rq.onrender.com/cart/${args.userId || guestId.userId}`);
        return res.data || null;
      } else {

        let post = await axios.post(`https://mern-ecommerce-app-42rq.onrender.com/cart/guest`, args);
        let guest ={
            userId:post.data.userId,
            phone:"",
            address:""
        }
        localStorage.setItem("guest",JSON.stringify(guest))
        let res = await axios.get(`https://mern-ecommerce-app-42rq.onrender.com/cart/${post.data.userId}`);
        console.log(res)
        return res.data || null
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (args, thunkAPI) => {
    try {
      let deleting = await axios.delete("https://mern-ecommerce-app-42rq.onrender.com/cart", {
        data: args,
      });
      let res;
      if (deleting.data === "empty") {
        res = getCart(args.userId);
      } else {
        res =
          (await axios.get(`https://mern-ecommerce-app-42rq.onrender.com/cart/${args.userId}`)) ||
          null;
      }
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateNumber = createAsyncThunk(
  "cart/updateNumber",
  async (args, thunkAPI) => {
    try {
      const cart = await axios.patch("https://mern-ecommerce-app-42rq.onrender.com/cart", args);
      const res = await axios.get("https://mern-ecommerce-app-42rq.onrender.com/cart/" + args.userId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const handleCheckOut = createAsyncThunk(
  "cart/handleCheckOut",
  async (args, thunkAPI) => {
    try {
      const checkingout = await axios.delete(
        "https://mern-ecommerce-app-42rq.onrender.com/cart/" + args
      );
      const res = await axios.get("https://mern-ecommerce-app-42rq.onrender.com/cart/" + args);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {
    resetCart: (state)=>{
        state.data=null
    }
  },
  extraReducers: {
    [getCart.pending]: (state) => {
      state.loading = true;
    },
    [getCart.fulfilled]: (state, action) => {
      
      state.loading = false;
      state.data = action.payload;
    },
    [getCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addToCart.pending]: (state) => {
      state.loading = true;
    },
    [addToCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [removeFromCart.pending]: (state) => {
      state.loading = true;
    },
    [removeFromCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [removeFromCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateNumber.pending]: (state) => {
      state.loading = true;
    },
    [updateNumber.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [updateNumber.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [handleCheckOut.pending]: (state) => {
      state.loading = true;
    },
    [handleCheckOut.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [handleCheckOut.rejected]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const {resetCart}=cartSlice.actions; 
export const d = (state) => state.cart.data;
export const e = (state) => state.cart.error;
export const l = (state) => state.cart.loading;
export default cartSlice.reducer;
