import React,{ useEffect} from "react"
import { useDispatch,useSelector } from "react-redux";
import Cuscard from "../components/card";
import { getAllFood } from "../store/slices/cookSlice"


const TestAPI = () => {
    const cook = useSelector(state => state.cook)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllFood())

    }, [])
    

    return (
        <div>   
                
                { cook && cook.data.map((item,index)=>{
                    return <Cuscard key={index} {...item} />
                })}
                <hr/>
                <pre>{JSON.stringify(cook,null,2)}</pre>
    
        </div>
    )
}

export default TestAPI
