import { createSlice } from '@reduxjs/toolkit'
import data from '../../data.json'

export const numOfItemsSlice = createSlice({
    name: 'numOfItems',
    initialState:{
        value:1
    },
    reducers: {
    increment: (state,action) => {
        state.value+=1
        
    },
    decrement: (state,action) => {
        

        state.value -= 1
    },
    setToDef: (state) => {
        state.value=1
    }
}
})

export const { increment, decrement, setToDef } = numOfItemsSlice.actions
export const numOfItem = state => state.numOfItems.value
export default numOfItemsSlice.reducer