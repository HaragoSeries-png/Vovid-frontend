import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"; 
import axios from "axios";


export const getAllFood = createAsyncThunk('getFood',
async () => {
    try {
        const res = await axios.get('https://ezcooks.herokuapp.com/food?category=ทั้งหมด');
        return res
    } catch (error) {
        throw error;
    }
}





)
const cookSlice = createSlice({
    name:'cook',
    initialState : {
        data:[],
        loading:false,
        status:'idle',
        error:''
    },
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
      },
     
    extraReducers :(builder)=>{
        builder.addCase(getAllFood.pending,(state,action)=>{
            state.loading = true;
            state.status = 'pending'
        })
        builder.addCase(getAllFood.fulfilled,(state,action)=>{

            state.loading = false;
            state.status = 'success'
            state.data = action.payload.data
        })
        builder.addCase(getAllFood.rejected,(state,action)=>{
            state.loading = false;
            state.status = 'fail'
            state.error = 'something wrong'
        })
    }
})

//reducer
export default cookSlice.reducer;