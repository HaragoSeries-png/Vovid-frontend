import axios from "axios";


const apiData = "https://vovid-backend-th.herokuapp.com/api/sum-of"

export const fecthDateApi = async () =>{
    let api = String(apiData)
    // try {
    //   let data = await axios.get(api);
    //   return data.data
    // }
    // catch (error) {
    //   console.log(error);
    // }
    console.log("ans : ",axios.get(api))
    return await axios.get(api);
  }