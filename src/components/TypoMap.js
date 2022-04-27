import React from "react";
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
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

var fakeBool = false;
const TypoMap = ({ data }) => {
  if (fakeBool) {
    return "Loading...";
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
                จังหวัด
                </Typography>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  <CountUp
                    start={0}
                    end={200}
                    duration={2.5}
                    separator=","
                  />
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
                  คลัสเตอร์
                </Typography>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  <CountUp
                    start={0}
                    end={200}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>

        <Grid item sm={10} md={10} className="type-box"  style={{marginTop:"10%"}}>
          <CardContent>
            <Grid container spacing={2} style={{ paddingTop: "0px" }}>
              <Grid item md={3.5}>
              <div style={{}}>   
                {/* <img
                  src={death}
                  width="60px"
                  justify="center"
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
                 Death
                </Typography>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  <CountUp
                    start={0}
                    end={200}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
 
    








    </div>
  );
};

export default TypoMap;
