import React from 'react'
import { useSelector } from 'react-redux';

function TestPage (){
    const count = useSelector((state)=>state.counter.value);
    return(
        <div>
            {count}
        </div>
    )
}


export default TestPage
