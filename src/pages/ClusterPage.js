import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Map from "../components/Map";
import TypoMap from "../components/TypoMap";
import "../css/cluster.css";
const ClusterPage = () =>{
var [selectProvince, setselectProvince] = useState(["-","-"])

const optionCases = [
  {
    name:"New cases",
    selected:true,
    data:[]
  },
  {
    name:"Total cases",
    selected:false,
    data:[]
  },
  {
    name:"New deaths",
    selected:false,
    data:[]
  },
  {
    name:"Total deaths",
    selected:false,
    data:[]
  },
]
const [selectedCases, setselectedCases] = useState(optionCases)

useEffect(() => {

}, [selectProvince,selectedCases])


  return (
    <div className="containers">
      <Grid container spacing={1}>
        <Grid item xs={9} md={9} style={{marginTop:"2%",marginLeft:"15px"}}>
          <Map style={{borderRadius:"12px"}} 
          selectProvince={selectProvince} 
          setselectProvince ={setselectProvince}
          selectedCases = {selectedCases}
          
          />
        </Grid>

        <Grid item xs={2} md={2}>
          <div style={{ marginTop: "5%" }}>
            <div className="layout-customize">
              <div className="box-text">
                <TypoMap selectProvince ={selectProvince}  
                setselectedCases={setselectedCases}  
                selectedCases = {selectedCases}
                />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ClusterPage;
