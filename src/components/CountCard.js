import React from "react";
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CardActions from '@mui/material/CardActions';
import styles from "../css/countcard.css";
import Button from '@mui/material/Button';
import CountUp from "react-countup";

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

const CountCard = ({ data }) => {
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
              <div style={{backgroundColor:"#DC3545",padding:"5px",borderRadius:"12px"}}>   
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
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  Infected
                </Typography>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  <CountUp
                    start={0}
                    end={data.confirmed.value}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>

        <Grid item sm={12} md={12} className="type-box" style={{marginTop:"10px"}}>
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
        </Grid>

        <Grid item sm={12} md={12} className="type-box" style={{marginTop:"10px"}}>
          <CardContent>
            <Grid container spacing={2} style={{ paddingTop: "0px" }}>
              <Grid item md={3.5}>
              <div style={{backgroundColor:"#FFC107",padding:"5px",borderRadius:"12px"}}>   
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
                    end={data.deaths.value}
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

export default CountCard;
