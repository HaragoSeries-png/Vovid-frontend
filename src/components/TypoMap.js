
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CardActions from '@mui/material/CardActions';
import styles from "../css/countcard.css";
import Button from '@mui/material/Button';
import CountUp from "react-countup";
import "../css/typomap.css"
//For applying multiples classes
import cx from "classnames";

//image insert
import infected from "../img/icon/virus.png";
import recovery from "../img/icon/recovery.png"
import death from "../img/icon/poison.png"
//Data is the name of the prop object


const TypoMap = ({ selectProvince,setselectedCases,selectedCases }) => {

  useEffect(() => {
  
  
  }, [selectProvince,selectedCases])
  const selectOptionArray = (item) =>{
    
    let temp_state = [...selectedCases];
    let temp_element = { ...temp_state[item] };
    temp_element.selected = !temp_element.selected;
    temp_state[item] = temp_element;

    
    let testAr = temp_state
    testAr.map((value,i)=> {

      if(item === i){
        value.selected = true
      }
      else{
        value.selected = false
      }
    })

    
    setselectedCases(testAr);
  }
  





  return (
    <div style={{overflowX:"none"}}>

      <Grid container spacing={0} style={{justifyContent:"center"}} >

        <Grid item sm={12} md={10} className="type-box" style={{marginTop:"10%"}} >
          <CardContent>
            <Grid container spacing={2} style={{ paddingTop: "0px" }}>
              <Grid item md={3.5}>
              <div style={{}}>   
                {/* <img
                  src={infected}
                  width="60px"      
                  style={{ paddingTop: "0px",marginLeft:"auto",marginRight:"auto" }}
                /> */}
                </div>
              </Grid>
              <Grid item md={8.5}>
                <Typography
                  color="white"
                  gutterBottom
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                Province
                </Typography>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
             {selectProvince[0]}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>

        <Grid item sm={10} md={10} className="type-box" style={{marginTop:"10%"}}>
          <CardContent>
            <Grid container spacing={2} style={{ paddingTop: "0px" }}>
              <Grid item md={3.5}>
                <div style={{}}>   
                {/* <img
                  src={recovery}
                  width="60px"
                  style={{ paddingTop: "0px",marginLeft:"auto",marginRight:"auto" }}
                /> */}
                </div>
      
              </Grid>
              <Grid item md={8.5}>
                <Typography
                  color="white"
                  gutterBottom
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  Cluster Group
                </Typography>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  <CountUp
                    start={"-"}
                    end={selectProvince[1]}
                    // end={100}
                    duration={0.5}
                 
                    separator=","
                  />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>

        <Grid item sm={10} md={10} className="type-box special-box"  style={{marginTop:"10%"}}>
          <CardContent>
            <Grid container  style={{ paddingTop: "0px" }}>
                <div style={{fontSize:"22px",textAlign:"center",paddingLeft:"25px",marginBottom:"10px"}}>
                  Customize Select
                </div>
                <div className="grid-contain">
                  {selectedCases.map((value,index)=>{
                    return(
                      <div
                      key={index.name}
                      style={{color:"white"}}
                      className={"box-select "+(value.selected === true ? "option-active" : "option-inactive" )}
                      onClick={()=>selectOptionArray(index)}
                      >
                        {value.name}
                      </div>
                    )
                  })}
                </div>
            
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
 
    








    </div>
  );
};

export default TypoMap;
