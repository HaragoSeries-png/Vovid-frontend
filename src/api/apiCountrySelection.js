import axios from "axios";
import { async } from "q";

                
const pieUrl    = "https://vovid-backend-th.herokuapp.com/api/daily-data?date="
const apiname   = ".herokuapp.com/api/"
const datethUrl   = "https://vovid-backend-"
export const fetchDate = async (dateData,country) =>{
  console.log("ct : ",country)
  let selectedCountry = ""
  if(country==="Thai"){
    selectedCountry = "th"
  }else{
    selectedCountry = "gb"
  }

  let api = String(datethUrl)+String(selectedCountry)+String(apiname)+"cases?date="+String(dateData)
 
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