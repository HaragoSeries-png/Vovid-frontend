import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
const Page1 = () => {
const tam = useSelector(state=>({...state}))

// useDispatch เปลี่ยนแลง store
const dispatch = useDispatch();


const handleLogin= () =>{
    dispatch({
        type:'LOGIN',
        payload:"eiei 1234"
    })        
}
const handleLogout =() =>{
    dispatch({
        type:'LOGOUT',
        payload:"อะไรวะ"
    })
}

  return <div>
      <h1>Hello Page1</h1>
        <h2>{tam.user}</h2>
        <button onClick={handleLogout}>Click in </button>
        <button onClick={handleLogin}>Click out</button>
  </div>;
};

export default Page1;
