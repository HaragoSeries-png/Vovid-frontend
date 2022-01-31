import React from "react";
import { useQueries, useQuery } from "react-query";
import axios from "axios";

async function fetchTestApi(){
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return data;
}

function Posts(){
    const {data , error ,isError, isLoading} = useQuery('post',fetchTestApi)
    if(isLoading){
        return <div>Loading .. .</div>
    }
    if(isError){
        return <div>Error! {error.message}</div>
    }

    return(
        <div className="container">
                <h2>This is testing post api</h2>
                {
                    data.map((post,index)=>{
                        return <li key={index}>{post.title}</li>
                    })
                }
        </div>
    )
}

export default Posts