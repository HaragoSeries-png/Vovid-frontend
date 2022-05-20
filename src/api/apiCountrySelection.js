import axios from "axios";
const pieUrl1    = "https://vovid-backend-"
const apiname   = ".herokuapp.com/api/"
const datethUrl   = "https://vovid-backend-"
export const fetchData = async (dateData,country,sortType) =>{
  
  let selectedCountry = ""
  let api

  if(country==="Thai"){
    selectedCountry = "th"
  }else{
    selectedCountry = "gb"
  }
  if(sortType.length ==  0){

    api = String(datethUrl)+String(selectedCountry)+String(apiname)+"cases?date="+String(dateData)
  }
  else{
   
    api = String(datethUrl)+String(selectedCountry)+String(apiname)+"cases?date="+String(dateData)+"&order="+sortType+"&by=desc"
  }
  // try {
  //   let data = await axios.get(api);
  //   return data.data
  // }
  // catch (error) {
  //   console.log(error);
  // }

  return  axios.get(api);
}

export const fetchPie = async(dateData,country)=>{
  let selectedCountry = ""
  if(country==="Thai"){
    selectedCountry = "th"
  }else{
    selectedCountry = "gb"
  }
  
  let api = String(pieUrl1) + String(selectedCountry) + ".herokuapp.com/api/daily-data?date="+ String(dateData)
  return await axios.get(api)
}