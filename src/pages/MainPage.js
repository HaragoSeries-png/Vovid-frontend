import React, { Component } from "react";
import BarExam from "../components/BarExam";
import LineExam from "../components/LineExam";
import { Map } from "../components/Map";
import PieExam from "../components/PieExam";
import { Row,Col } from 'react-bootstrap';

import "../css/mainpage.css";
import { Cardchart } from "../components/Cardchart";
import Posts from "../components/Posts";
import { useSelector,useDispatch } from 'react-redux'
import Topic from "../components/Topic";
import CountCard from "../components/CountCard";
import {fetchData} from "../api/apicount"
import CountryPicker from "../components/CountryPicker"
import MainChart from "../components/MainChart";
import Box from '@mui/material/Box';
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CardActions from '@mui/material/CardActions';
import styles from "../css/countcard.css";
import Button from '@mui/material/Button';
import CountUp from "react-countup";
import MainFirstChart from "../components/MainFirstChart";


const cardStyle = {
  color: "red",
  textAlign: "center",
  marginLeft: "50px",
};





export class MainPage extends Component {
  state = {
    data: {},
    country: ""
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async country => {
    //fetch the data for a specific country
    const fetchedData = await fetchData(country);
    //set the state
    this.setState({ data: fetchedData, country: country });
  };
  



  render() {
    const { data, country } = this.state;
    return (
      
      <div className="container">
        <Topic/>
        <hr></hr>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <CountCard  data={data} />
        <div style={{marginTop:'5%'}}>
        <Grid container rowspacing={1} columnspacing={{ xs: 1, sm: 2, md: 3 }}  >
        <Grid item xs={12}>
          <Card sx={{ minWidth: 275 }}>
           <MainFirstChart data={data} country={country} />

          </Card>
        </Grid>
        </Grid>
  </div>      
    
        {/* <MainChart/> */}


        {/* <div className="map-section section">
          <Map />
        </div> */}
        <div>

        </div>
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
  }
}

export default MainPage;
