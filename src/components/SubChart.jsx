import { current } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import HorizontalBar from 'react-chartjs-2';
import "../css/subChart.css"
const Swap = ({chosen}) =>{
  if(chosen === "Pie"){
    const data = {
      labels: ["Pending", "Shipping", "Delivery", "Pickup"],
      datasets: [
        {
          data: [10,10,10,10],
          backgroundColor: ["#F77F00", "#5BC0BE", "green", "#281a91"],
        },
      ],
    } 
    return (
      <div className="graph-contain" style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <div className="graph_donut" style={{width:"400px",paddingTop:"0px",marginTop:"-45px"}}>
					<Doughnut 
            data={data}
						options={{
							cutoutPercentage: 50,
  							maintainAspectRatio: true,
                plugins: { 
						    	legend: {
								    display: true,
								    position: 'right',
                    align:'left',
                    labels:{
                      color:'white'
                    }
							}
            }
						}} 
					/>
				</div>
      </div>
    )
  }
  else if(chosen ==="Line"){
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "First dataset",
          data: [33, 53, 85, 41, 44, 65],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        },
        {
          label: "Second dataset",
          data: [33, 25, 35, 51, 54, 76],
          fill: false,
          borderColor: "#742774"
        }
      ]
    };

    return(
      <div>
         <Line data={data} />
      </div>
    )
  }
  else if(chosen ==="Bar"){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [verticalBar,setverticalBar] = useState(true);
    function changeBarType(bool){
       setverticalBar(bool);
    }
    const dataBar = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#EC932F',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My First dataset 2',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    };
    const optionx = {
      scales: {

      },
      indexAxis:'y'
    };
    const optiony = {
      scales: {

      },
      indexAxis:'x'
    };
    return(
      <div>
        <div className="bar-header">
          <p className={verticalBar === true ? 'typeBar-active' : 'typeBar-non-active'}  onClick={()=>changeBarType(true)}>Vertical Display</p>
          <p className={verticalBar === false ? 'typeBar-active' : 'typeBar-non-active'}  onClick={()=>changeBarType(false)}>Horizontal Display</p>
        </div>
        {/* if(verticalBar === true){
          <Bar data={dataBar}/>
        } */}
        {verticalBar === true ? <Bar data={dataBar} options={optiony} /> : <Bar data={dataBar}  options={optionx} />}
      </div>
    )
  }
}
const SubChart = (props) => {

  const graphType =props.graphType;
 

  const [currentChart, setcurrentChart] = useState(graphType);
  

  function changeChart(nameChart) {
    setcurrentChart(nameChart);
  }
  return (
    <div className="containChart">
      <div className="top-content">
        {/* */}
        <div className="header-font">Attribute Name</div>
        <div className="header-font"> 
        <button className={currentChart === 'Line' ? 'active-btn' : 'btn-chart'} onClick={()=>changeChart("Line")}>Line</button>
        <button className={currentChart === 'Pie' ? 'active-btn' : 'btn-chart'} onClick={()=>changeChart("Pie")}>Pie</button>
        <button className={currentChart === 'Bar' ? 'active-btn' : 'btn-chart'} onClick={()=>changeChart("Bar")}>Bar</button>
        </div>
      </div>
      <hr style={{backgroundColor:"black"}}></hr>
      <div className="btm-content">
        {/* {currentChart == "Bar" ? <div>Bar</div> :currentChart=="Pie"?<div>Pie</div>:<div>Soon</div>} */}
        <Swap chosen={currentChart}  />
      </div>
    </div>
  );
};

export default SubChart;
