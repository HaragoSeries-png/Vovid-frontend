import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addData, setLoading } from '../store/slices/foodSlice'
import { increment,decrement } from '../store/slices/counterSlice'
const HomePage = () => {
const count = useSelector((state)=>state.counter.value)
const food = useSelector(state => state.food)
const dispatch = useDispatch()
const [DataState, setDataState] = useState()

const handleClick = () =>{
    dispatch(setLoading());
}
const submitData=()=>{
    
    dispatch(addData(DataState));
    setDataState('');
}
const deleteData=()=>{
    dispatch(deleteData());
}


    
  const fileRef = useRef(null);
  function onFileChange(event){
      fileRef.current = event.target.files[0]
  }
  function increase(){
      dispatch(increment());
  }
    return (
        <div className='container'>
            this is homepage
            {
               String(food.loading)
            }
            <h1>
                {count}
            </h1>
            <button onClick={increase}>Increment</button>
            <div>
                <input type="text" onChange={(event)=>{setDataState(event.target.value)}} value={DataState} />
            </div>
            <div>
                <button onClick={submitData}>Submit</button>
                <button onClick={deleteData}>delete</button>
            </div>

            <div>
               <input type="file"  />
            </div>




        </div>
    )
}

export default HomePage
