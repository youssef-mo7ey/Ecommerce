import { configureStore } from '@reduxjs/toolkit'
import numOfItems from './Features/numberOfItems'
import cartSlice from './Features/cartSlice'
import usersSlice from './Features/usersSlice'

export const store = configureStore({
  reducer: {
    numOfItems:numOfItems,
    cart:cartSlice,
    user:usersSlice
  },
})

