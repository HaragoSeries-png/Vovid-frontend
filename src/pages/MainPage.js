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

const MainPage = () => {
  const [data, setdata] = useState({});
  const [country, setcountry] = useState();
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
      name: "Total deaths",
      selected: true,
      data:[],
      
    },
    {
      name: "Total cases",
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
      console.log("form main : bar")
    }
    console.log("from main",optionSelectx)
  },
  [currentChart,optionSelectx])





 const handleCountryChange = async (country) => {
    //fetch the data for a specific country
    const fetchedData = await fetchData(country);
    //set the state
    setdata(fetchedData);
    setcountry(country);
    
    if(country ==="Thailand"){
    setdataGraph(await fecthThAPI());
    }
  };




  return (
    <div className="container">
      <Topic />
      <hr></hr>
      <CountryPicker handleCountryChange={handleCountryChange} />
      <CountCard data={data} />
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
              /> 
            </div>

          </div>
        </div>
      </div>


{/* 
      <div style={{ marginTop: "2%" }}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <SubChart graphType="Line" />
          </Grid>
          <Grid item md={6}>
            <SubChart graphType="Pie" />
          </Grid>
        </Grid>
      </div> */}
      {/* <div style={{ marginTop: "2%" }}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <SubChart graphType="Bar" />
          </Grid>
          <Grid item md={6}>
            <SubChart graphType="Radar" />
          </Grid>
        </Grid>
      </div> */}
      {/* <div style={{ marginTop: "2%" }}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <SubChart graphType="Bar" />
          </Grid>
          <Grid item md={6}>
            <SubChart graphType="Scatter" />
          </Grid>
        </Grid>
      </div> */}
      {/* <div className='row' style={{marginTop:"6%"}}>
                    <div className='col-md-4'>
                    <div style={cardStyle}>BarChart</div>
                    <BarExam/>
                    </div>
                    <div className='col-md-4'>
                    <div style={cardStyle}>LineChart</div>
                    <LineExam/>
                    </div>
                    <div className='col-md-4'>
                    <div style={cardStyle}>PieChart</div>
                    <PieExam/>
                    </div>
                </div> */}
      <div className="graph-section">
        {/* <Row className="row-distance">
            <Col className="LineGraphSize"><Cardchart  name="Line chart"/></Col>
            <Col><Cardchart  name="Bar chart"/></Col>
          </Row>
          <Row className="row-distance">
            <Col><Cardchart  name="Pie chart"/></Col>
            <Col><Cardchart  name="Bar chart"/></Col>
          </Row> */}
      </div>
      {/* <Posts/> */}
    </div>
  );
};

export default MainPage;
