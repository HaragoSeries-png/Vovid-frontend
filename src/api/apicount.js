import axios from "axios";

const url = "https://covid19.mathdro.id/api";

//Asynchronous function
//if country is undefined we use url for all countries else we modify the url to get a specific country
//returns the numbers of deaths,infections and recovered globally or of specific country
export const fetchData = async (country) => {
  console.log("fetch data : ",country);
  let changeableUrl = url;
  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }
  try {
    //déconstruction de l'objet
    const {data: { confirmed, recovered, deaths, lastUpdate }
  } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
    /* OR
    const modifiedData = {
      confirmed: data.confirmed,
      recovered: data.confirmed,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate
    }; */

    //return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

//Returns data form the graph
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    //looping through an the array of objects and returning  objects
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate
    }));

    return modifiedData;
  } catch (error) {}
};

//Returns the countries for the countrypicker
export const fetchCountries = async () => {
  try {
    const {
      data: { countries }
    } = await axios.get(`${url}/countries`);
    
    return countries.map(function (country) {
      return country.name;
    });
  } catch (error) {
    console.log(error);
  }
};
