import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const ReactQuery = () => {
  const { isLoading, error, data } = useQuery("repoData", async () => {
    try {
      const res = await axios.get(
        "https://ezcooks.herokuapp.com/food?category=ทั้งหมด"
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  });

  // if(isLoading){
  //     return <div>Loading...</div>
  // }

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div>
            {data.map((image,index)=>{
                return  <img src={image.imageFood}  key={index}/>
            })}
         
        </div>
      )}
    </div>
  );
};

export default ReactQuery;
