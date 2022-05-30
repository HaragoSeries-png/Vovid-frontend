import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { CardContent, Typography, Grid } from "@material-ui/core";
import CardActions from '@mui/material/CardActions';
import styles from "../css/countcard.css";
import Button from '@mui/material/Button';
import CountUp from "react-countup";
import {fetchPieNodate } from "../api/apiCountrySelection";
//For applying multiples classes
import cx from "classnames";

//image insert
import infected from "../img/icon/virus.png";
import recovery from "../img/icon/recovery.png"
import death from "../img/icon/poison.png"
//Data is the name of the prop object



const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const CountCard = ({ data,country }) => {

  const [valueInfected, setvalueInfected] = useState("")
  const [valueDeaths, setvaluelDeaths] = useState("")
  var selectValue = ""
  country = country.filter((value)=>{
    return value.selected === true
  })
  selectValue = country[0].country
  function setRegion(region,value){
    if(region === "Thai"){
      setvalueInfected(value.data.total_cases)
      setvaluelDeaths(value.data.total_deaths)
    }else{
      setvalueInfected(value.data.total_cases)
      setvaluelDeaths(value.data.total_deaths)
    }
  }


  useEffect(async () => {
  console.log("country : ",country)
  console.log("selected value : ",selectValue)
  await fetchPieNodate(selectValue).then((value)=>{
    setRegion(selectValue,value)
  })

  }, [country])
  

  if (!data.confirmed) {
    return "Loading...";
  }
  return (
    <div>

      <Grid container spacing={1}  style={{marginTop:"3px"}}>
        <Grid item sm={12} md={12} className="type-box" style={{marginTop:"10px"}}>
          <CardContent>
            <Grid container spacing={2} style={{ paddingTop: "0px" }}>
              <Grid item md={3.5}>
              <div style={{backgroundColor:"rgb(80 151 27)",padding:"5px",borderRadius:"12px"}}>   
                <img
                  src={infected}
                  width="60px"      
                  style={{ paddingTop: "0px",marginLeft:"auto",marginRight:"auto" }}
                />
                </div>
              </Grid>
              <Grid item md={8.5}>
                <Typography
                  color="white"
                  gutterBottom
                  style={{ textAlign: "left", fontSize: "20px",fontWeight:"bold" }}
                >
                 Infected
                </Typography>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  <CountUp
                    start={0}
                    end={valueInfected}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>

        {/* <Grid item sm={12} md={12} className="type-box" style={{marginTop:"10px"}}>
          <CardContent>
            <Grid container spacing={2} style={{ paddingTop: "0px" }}>
              <Grid item md={3.5}>
                <div style={{backgroundColor:"#17A2B8",padding:"5px",borderRadius:"12px"}}>   
                <img
                  src={recovery}
                  width="60px"
                  style={{ paddingTop: "0px",marginLeft:"auto",marginRight:"auto" }}
                />
                </div>
      
              </Grid>
              <Grid item md={8.5}>
                <Typography
                  color="white"
                  gutterBottom
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  Recovered
                </Typography>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  <CountUp
                    start={0}
                    end={data.recovered.value}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid> */}

        <Grid item sm={12} md={12} className="type-box" style={{marginTop:"10px"}}>
          <CardContent>
            <Grid container spacing={2} style={{ paddingTop: "0px" }}>
              <Grid item md={3.5}>
              <div style={{backgroundColor:"#DC143C",padding:"5px",borderRadius:"12px"}}>   
                <img
                  src={death}
                  width="60px"
                  justify="center"
                  style={{ paddingTop: "0px",marginLeft:"auto",marginRight:"auto" }}
                />
                </div>
              </Grid>
              <Grid item md={8.5}>
                <Typography
                  color="white"
                  gutterBottom
                  style={{ textAlign: "left", fontSize: "20px",fontWeight:"bold" }}
                >
                Death
                </Typography>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  <CountUp
                    start={0}
                    end={valueDeaths}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>


        <Grid item sm={12} md={12} className="type-box" style={{marginTop:"10px",height:"min-content"}}>
          <CardContent>
            <Grid container spacing={2} style={{ paddingTop: "0px" }}>
              <Grid item md={8.5}>
                <Typography
                  color="white"
                  gutterBottom
                  style={{ textAlign: "center", fontSize: "20px",fontWeight:"bold" }}
                >
                 Suggestion
                </Typography>
                <div style={{fontSize:"15px",textAlign:"left"}}>
                Line graph and Bar graph can use  <span style={{color:"orange"}}>zoom</span>  and <span style={{color:"orange"}} >pan</span>  function. 
                </div>
                  <ul style={{fontSize:"15px",textAlign:"left",marginTop:"10px"}} >
                    <li>   <span style={{color:"orange"}} >Zoom</span>   in or out : mouse wheel</li>
                    <li> <span style={{color:"orange"}} >Pan</span> : drag left or right</li>
                  </ul>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>




















      </Grid>
 
    








    </div>
  );
};

export default CountCard;
