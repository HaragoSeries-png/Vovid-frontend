import { createSlice } from "@reduxjs/toolkit"; 
const foodSlice = createSlice({
    name:'food',
    initialState : {
        data:[],
        loading:false,
        status:'idle',
        error:''
    },
    reducers:{
        setLoading : (state,action) =>{
            //payload=ค่าที่ส่งเข้ามา

            state.loading = !state.loading;
          
   
        },
        addData : (state,action)=>{
            state.data.push(action.payload);
        },
        deleteData : (state,action)=>{
            state.data.pop();
        }
    }
})

//action
export const {setLoading,addData,deleteData} = foodSlice.actions
//reducer
export default foodSlice.reducer;