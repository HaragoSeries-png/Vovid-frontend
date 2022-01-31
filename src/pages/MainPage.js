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
const cardStyle = {
  color: "red",
  textAlign: "center",
  marginLeft: "50px",
};

export class MainPage extends Component {
  render() {
    return (
      
      <div className="container">
        <div className="map-section section">
          <Map />
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
          <Row className="row-distance">
            <Col className="LineGraphSize"><Cardchart  name="Line chart"/></Col>
            <Col><Cardchart  name="Bar chart"/></Col>
          </Row>
          <Row className="row-distance">
            <Col><Cardchart  name="Pie chart"/></Col>
            <Col><Cardchart  name="Bar chart"/></Col>
          </Row>
        </div>
        <Posts/>
      </div>
    );
  }
}

export default MainPage;
