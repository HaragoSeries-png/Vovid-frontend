import React, { useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
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
      <div className="graph-contain" style={{width:"100%",display:"flex",justifyContent:"center"}}>
          <div className="graph_donut" style={{width:"100%"}}>
					<Doughnut 
            data={data}
						options={{
							cutoutPercentage: 50,
  							maintainAspectRatio: true,
							legend: {
								display: true,
								position: 'bottom',
							},
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
}
const SubChart = () => {
  const [currentChart, setcurrentChart] = useState("Line");

  function changeChart(nameChart) {
    setcurrentChart(nameChart);
  }
  return (
    <div className="containChart">
      <div className="top-content">
        {/* */}
        <div className="header-font">Attribute Name</div>
        <div className="header-font"> 
        <button onClick={()=>changeChart("Bar")}>Line</button>
        <button onClick={()=>changeChart("Pie")}>Pie</button>
        </div>
      </div>
      <hr></hr>
      <div className="btm-content">
        {/* {currentChart == "Bar" ? <div>Bar</div> :currentChart=="Pie"?<div>Pie</div>:<div>Soon</div>} */}
        <Swap chosen={currentChart} />
      </div>
    </div>
  );
};

export default SubChart;
