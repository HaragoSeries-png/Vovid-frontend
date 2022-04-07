import axios from "axios";
import { async } from "q";
const thUrl = "https://vovid-backend-th.herokuapp.com/api/weekly-cases";
const datethUrl = "https://vovid-backend-th.herokuapp.com/api/cases?date="
export const fecthThAPI = async () => {
  let apiUrl = thUrl;

  try {
    //déconstruction de l'objet
    const data = await axios.get(apiUrl);
    console.log("from api ",data.data);
    return data.data;

  } catch (error) {
    console.log(error);
  }
};
export const fetchDateth = async (dateData) =>{
  let api = String(datethUrl) + String(dateData)
  
  try {
    let data = await axios.get(api);
    return data.data
  }
  catch (error) {
    console.log(error);
  }
}