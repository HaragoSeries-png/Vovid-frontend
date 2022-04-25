import axios from "axios";


const apiData = "https://vovid-backend-th.herokuapp.com/api/sum-of?date="

export const fecthDateApi = async (dateValue) =>{
    let api = String(apiData) + dateValue
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