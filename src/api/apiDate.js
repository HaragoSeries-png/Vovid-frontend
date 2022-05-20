import axios from "axios";



const apiData1 = "https://vovid-backend-"
var selectedCountry
export const fecthDateApi = async (dateValue,country) =>{
  if(country==="Thai"){
    selectedCountry = "th"
  }else{
    selectedCountry = "gb"
  }

    let api = String(apiData1)+String(selectedCountry) +".herokuapp.com/api/sum-of?date="+ dateValue
 
    return await axios.get(api);
  }