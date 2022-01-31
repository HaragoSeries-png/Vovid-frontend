import React, { Component } from "react";
import { decrement, increment } from "../store/slices/counterSlice";
import { useSelector, useDispatch } from "react-redux";

function ValueTesting(){
    const count = useSelector((state)=>state.counter.value);
    const dispatch = useDispatch();
    return (
        <div>
            <h1>{count}</h1>
            <button aria-label="Increment" onClick={()=>dispatch(increment())}>
                Increment
            </button>
            <button aria-label="Decrement" onClick={()=>dispatch(decrement())}>
                Decrement
            </button>
        </div>
    )
}

export default ValueTesting
