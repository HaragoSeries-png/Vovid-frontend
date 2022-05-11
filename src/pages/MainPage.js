import React, { Component, useEffect, useState } from "react";
import Map from "../components/Map";
import "../css/mainpage.css";
import { useSelector, useDispatch } from "react-redux";
import Topic from "../components/Topic";
import CountCard from "../components/CountCard";
import { fetchData } from "../api/apicount";
import CountryPicker from "../components/CountryPicker";
import SubChart from "../components/SubChart";
import Box from "@mui/material/Box";
import { Card, Grid } from "@material-ui/core";
import MainFirstChart from "../components/MainFirstChart";
import CustomizeSection from "../components/CustomizeSection";
import SelectGraph from "../components/SelectGraph";
import { fecthThAPI } from "../api/apiCountrySelection";
import SelectCountry from "../components/SelectCountry";

const MainPage = () => {
  const [data, setdata] = useState({});
  
  const [xAxis, setxAxis] = useState("Location");
  const [yAxis, setyAxis] = useState("New cases");
  const [graphSelector, setgraphSelector] = useState()
  const [dataGraph, setdataGraph] = useState()
  const [multiSelect, setmultiSelect] = useState(true)
  const [currentChart, setcurrentChart] = useState(null);
  
  const optionTypeX = [
    {
      name: "Location",
      selected: true,
      data:[],
      
    },
    {
      name: "Date",
      selected: false,
      data:[],
  
    },
  ]


  const optionTypeY = [
    {
      name: "Total cases",
      selected: true,
      data:[],
      
    },
    {
      name: "Total deaths",
      selected: true,
      data:[],
  
    },
    {
      name: "New cases",
      selected: false,
      data:[],
      
    },

    {
      name: "New deaths",
      selected: false,
      data:[],
     
    },

  ];

  const countryList = [
    {
      country : "Thai",
      selected:true
    },
    {
      country:"Global",
      selected:false
    }

  ]
  const [country, setcountry] = useState(countryList);
  const [optionSelect, setoptionSelect] = useState(optionTypeY)
  const [optionSelectx, setoptionSelectx] = useState(optionTypeX)

  useEffect(async () => {
    const fetchedData = await fetchData();
    setdata(fetchedData);
    

    // if(currentChart ==="Pie"){
    //   console.log(".....")
    //   let a = optionType.map((p)=>p.selected === false ?{...p,selected:true}:p)
    //   console.log("a : ",a)
    //   optionType = a
    //   console.log("ot : ",optionType)
    // }
    
    
    
    if(currentChart ===null){
      setcurrentChart("Line")
      
    }


    
    if(currentChart==="Bar"){

    }

  },
  [currentChart,optionSelectx])









  return (
    <div className="container">


  <Grid container spacing={1}>
  <Grid item xs={3} md={3}>
   <div style={{color:"white"}}>
    <SelectCountry  country={country} setcountry={setcountry}   />
    </div>   
  <CountCard data={data} />
  </Grid>

  <Grid item xs={9} md={9}>
   
  <div style={{ marginTop: "5%" }}>
        <div className="layout-customize">
          
          <div className="wid-100-1">
          <CustomizeSection
          xAxis={xAxis}
          yAxis={yAxis}
          setxAxis={setxAxis}
          setyAxis={setyAxis}
          multiSelect={multiSelect}
          setmultiSelect={setmultiSelect}
          optionSelect = {optionSelect}
          setoptionSelect = {setoptionSelect}
          currentChart = {currentChart}
          optionSelectx = {optionSelectx}
          setoptionSelectx = {setoptionSelectx}
          />
          </div>


          <div className="wid-100-2">
            <div> 
            <SubChart  
            dataGraph={dataGraph} 
            x={xAxis} 
            y={yAxis} 
            setxAxis={setxAxis}
            setyAxis={setyAxis}
            multiSelect={multiSelect} 
            setmultiSelect={setmultiSelect}
            optionSelect={optionSelect}
            currentChart = {currentChart}
            setcurrentChart = {setcurrentChart}
            optionSelectx = {optionSelectx}
            country = {country}
              /> 
            </div>

          </div>
        </div>
      </div>
  </Grid>

</Grid>






    </div>
  );
};

export default MainPage;
