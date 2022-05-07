import axios from "axios";
import { async } from "q";
const thUrl = "https://vovid-backend-th.herokuapp.com/api/weekly-cases";
const datethUrl = "https://vovid-backend-th.herokuapp.com/api/cases?date="
const pieUrl    = "https://vovid-backend-th.herokuapp.com/api/daily-data?date="
export const fecthThAPI = async () => {
  let apiUrl = thUrl;

  try {
    const data = await axios.get(apiUrl);
    return data.data;

  } catch (error) {
    console.log(error);
  }
};

export const fetchDateth = async (dateData) =>{


  let api = String(datethUrl) + String(dateData)
  // try {
  //   let data = await axios.get(api);
  //   return data.data
  // }
  // catch (error) {
  //   console.log(error);
  // }
  return await axios.get(api);
}

export const fetchPie = async(dateData)=>{
  let api = String(pieUrl) + String(dateData)
  return await axios.get(api)
}