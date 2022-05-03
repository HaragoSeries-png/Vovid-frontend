import axios from "axios";

const urlCluster = "https://vovid-backend-th.herokuapp.com/api/cluster";

export const fetchCluster = async () =>{
    let api = urlCluster
    
    return await axios.get(api)
    
    
    
}