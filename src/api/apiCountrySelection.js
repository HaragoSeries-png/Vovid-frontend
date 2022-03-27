import axios from "axios";
const thUrl = "https://vovid-backend-th.herokuapp.com/api/weekly-cases";

export const fecthThAPI = async () => {
  let apiUrl = thUrl;

  try {
    //déconstruction de l'objet
    const data = await axios.get(apiUrl);
    return data.data[1].result;

  } catch (error) {
    console.log(error);
  }
};
