import React, { Component } from "react";
import Map  from "../components/Map";
import "../css/mainpage.css";
import { useSelector,useDispatch } from 'react-redux'
import Topic from "../components/Topic";
import CountCard from "../components/CountCard";
import {fetchData} from "../api/apicount"
import CountryPicker from "../components/CountryPicker"
import SubChart from "../components/SubChart";
import Box from '@mui/material/Box';
import { Card, Grid } from "@material-ui/core";
import MainFirstChart from "../components/MainFirstChart";







export class MainPage extends Component {
  state = {
    data: {},
    country: "",
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
    const graphType ="Line"
    return (
      
      <div className="container">
        <Topic/>
        <hr></hr>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <CountCard  data={data} />
        <div style={{marginTop:'5%'}}>
        <Grid container rowspacing={2} columnspacing={{ xs: 1, sm: 2, md: 3 }}  >
        <Grid item xs={12}>
          <Card sx={{ minWidth: 275 }}>
           <MainFirstChart data={data} country={country} />
          </Card>
        </Grid>
        </Grid>
        </div>      

      
        <div  style={{marginTop:"2%"}}>
          <Map country={country} />
        </div>




        <div style={{marginTop:"2%"}}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <SubChart graphType="Line"  />
          </Grid>
          <Grid item md={6}>
            <SubChart graphType="Pie" />
          </Grid>
        </Grid>
        </div>
        <div style={{marginTop:"2%"}}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <SubChart graphType="Bar"  />
          </Grid>
          <Grid item md={6}>
            <SubChart graphType="Radar" />
          </Grid>
        </Grid>
        </div>
        <div style={{marginTop:"2%"}}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <SubChart graphType="Bar"  />
          </Grid>
          <Grid item md={6}>
            <SubChart graphType="Scatter" />
          </Grid>
        </Grid>
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
