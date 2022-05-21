import axios from "axios";
const pieUrl1    = "https://vovid-backend-"
const apiname   = ".herokuapp.com/api/"
const datethUrl   = "https://vovid-backend-"
export const fetchData = async (dateData,country,sortType,orderType) =>{
  
  let selectedCountry = ""
  let api

  if(country==="Thai"){
    selectedCountry = "th"
  }else{
    selectedCountry = "gb"
  }
  console.log("order type api : ",orderType.length)
  if(orderType.length ==  1){
    console.log("11111111111111")
    api = String(datethUrl)+String(selectedCountry)+String(apiname)+"cases?date="+String(dateData)
  }
  else{
    console.log("22222222222")
    api = String(datethUrl)+String(selectedCountry)+String(apiname)+"cases?date="+String(dateData)+"&order="+sortType+"&by=" + orderType
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