import React, { Component } from 'react'
import BarExam from '../components/BarExam'
import LineExam from '../components/LineExam'
import { Map } from '../components/Map'
import PieExam from '../components/PieExam'
import "../css/mainpage.css"
const cardStyle={
    color:"red",
    textAlign:"center",
    marginLeft:"50px"
}
export class MainPage extends Component {
    
    render() {
        return (
            <div className='container'>
                <div className='map-section section'>
                    <Map/>
                </div>
                <div className='row' style={{marginTop:"6%"}}>
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
                </div>
          
            </div>
        )
    }
}

export default MainPage
