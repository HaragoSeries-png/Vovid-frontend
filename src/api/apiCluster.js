import axios from "axios";

const urlCluster = "https://vovid-backend-th.herokuapp.com/api/cluster?cluster=";

export const fetchCluster = async (name) =>{
    let api = urlCluster + name
    
    return await axios.get(api)
    
    
    
}