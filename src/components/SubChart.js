import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import {Chart} from 'chart.js';
import { Bar, Doughnut, Line, Radar, Scatter } from "react-chartjs-2";
import HorizontalBar from "react-chartjs-2";
import "../css/subChart.css";
import { YAxis } from "recharts";
import zoomPlugin from "chartjs-plugin-zoom";
import SelectDate from "./SelectDate";
import { fetchDateth } from "../api/apiCountrySelection";

Chart.register(zoomPlugin); // REGISTER PLUGIN

const Swap = ({ chosen, disableChart, x, y, dataGraph,valueDate,dateData }) => {

useEffect(async() => {
  let fetchDataDateapi = await fetchDateth(valueDate)
  console.log("use : ",fetchDataDateapi);

}, [valueDate])


  if (chosen === "Pie") {
    const data = {
      labels: ["Pending", "Shipping", "Delivery", "Pickup"],
      datasets: [
        {
          data: [10, 10, 10, 10],
          backgroundColor: ["#F77F00", "#5BC0BE", "green", "#281a91"],
        },
      ],
    };

    // Pie
    // data={
    //   labels:[]
    //   datasets:[
    //     {
    //       data:[],
    //       backgroundColor:[""]
    //     }
    //   ]
    // }

    if (disableChart === "true") {
      return (
        <div
          className="graph-contain"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="graph_donut"
            style={{ width: "500px", paddingTop: "0px", marginTop: "0px" }}
          >
            <Doughnut
              data={data}
              options={{
                cutoutPercentage: 50,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "right",
                    align: "left",
                    labels: {
                      color: "white",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      );
    } else {
      return <div>Can not visualize</div>;
    }
  } else if (chosen === "Line") {
    //if dataset in y axis > 1  graph will compare between 2 dataset
    //Line
    // data={
    // //xAxis
    // labels:[""],
    //yAxis
    //   datasets:[
    //     {
    //       label:"First data",
    //       data:[]
    //     },
    //   ]
    // }

    let newCase ;
    let totalCase = [];
    let location ;
    let date = [];
    let newDeath = [];
    let death = [];
    let storageAxis= ["",""];
    let dataStorage = [];
    let ddate ;
    let realLocate =[];
    let testDatax =['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'];
    let testDatay =[1,2,3,4,5];
    function pullAllValue() {

    let returnData = dataGraph?.filter((val)=>{
      return val.date == ddate
    })
      newCase = returnData?.map((value) => {
        let a = value.result;
        let result = a.map(x => x.newCase)
        return result
      });
      console.log("real : ",newCase);
      totalCase = returnData?.map((value) => {
        let a = value.result;
        let result = a.map(x => x.totalCase)
        return result
      });
      location = returnData?.map((value) => {
        let a = value.result;
        let result = a.map(x => x.location)
        return result
      });
      console.log("lct",location);
      date = dataGraph?.map((value) => {
        date.push(value.date)
      });
      newDeath = returnData?.map((value) => {
        let a = value.result;
        let result = a.map(x => x.newDeath)
        return result
      });
      death = returnData?.map((value) => {
        let a = value.result;
        let result = a.map(x => x.death)
        return result
      });
    }
    // console.log("data is : ",dataGraph);
    // console.log("totalCase : ",totalCase);
    // console.log("location : ",location);
    // console.log("date : ",date);
    // console.log("newDeath : ",newDeath);
    // console.log("death : ",death);
    // let testlo = location.split(',');
    // console.log(testlo);
    // console.log();

    function chooseRealShow(axisValue,axis){
        let setValue = 0;
        if(axis === 0){
          setValue = 0
        }else if(axis===1){
          setValue = 1
        }
        //before do function
        console.log("axisValue : ",axisValue);
        console.log("axis : ",setValue + " axis :",axis);
        if(axisValue ==="Location"){
          storageAxis[setValue] = location
        }
        else if(axisValue === "New cases"){
          storageAxis[setValue] = newCase
        }
        else if(axisValue === "Total cases"){
          storageAxis[setValue] = totalCase
        }
        else if(axisValue === "New deaths"){
          storageAxis[setValue] = newDeath
        }
        else if(axisValue === "Total deaths"){
          storageAxis[setValue] = death
        }
        else if(axisValue === "Date"){
          storageAxis[setValue] = date
        }
        else{
          storageAxis[setValue] = location
        }
    }
    
    pullAllValue();
    chooseRealShow(x,0);
    chooseRealShow(y,1);
    console.log(storageAxis);
    // let spit = location?.split(',');
    
    const data = {
      //x label
      labels: testDatax,
      datasets: [
        {
          label: "First dataset",
          //y label
          data: testDatay,
          fill: true,
          backgroundColor: "orange",
          borderColor: "orange",
        },
      ],
    };

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Line
          style={{
            width: "100%",
            height: "400px",
            marginTop: "3.5%",
            overflowX: "auto",
          }}
          data={data}
          options={{

            plugins: {
              // zoom: {
              //   zoom: {
              //     wheel: {
              //       enabled: true // SET SCROOL ZOOM TO TRUE
              //     },
              //     mode: "x",
              //     speed: 100
              //   },
              //   pan: {
              //     enabled: true,
              //     mode: "x",
              //     speed: 100
              //   }
              // },
              legend: {
                display: false,

                labels: {
                  color: "white",
                },
              },
              
            },
            scales: {
              y: {
                ticks: {
                  color: "white",
                },
              },
              x: {
                ticks: {
                  color: "white",
                  //data can show all province but space in x axis is too low
                  autoSkip: true,
                  stepSize: 0.5,
                },
              },
            },
          }}
        />
      </div>
    );
  } else if (chosen === "Bar") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [verticalBar, setverticalBar] = useState(true);
    function changeBarType(bool) {
      setverticalBar(bool);
    }

    // //bar
    // data={
    //   //xAxis
    //   labels:[""],
    //   datasets:[
    //     {

    //     }
    // ]
    // }
    
    let newCase = [];
    let totalCase = [];
    let location = [];
    let date = [];
    let newDeath = [];
    let death = [];
    let storageAxis= ["",""];
    function pullAllValue() {
      newCase = dataGraph?.map((value) => {
        return value.newCase;
      });
      totalCase = dataGraph?.map((value) => {
        return value.totalCase;
      });
      location = dataGraph?.map((value) => {
        return value.location;
      });
      date = dataGraph?.map((value) => {
        return value.date;
      });
      newDeath = dataGraph?.map((value) => {
        return value.newDeath;
      });
      death = dataGraph?.map((value) => {
        return value.death;
      });
    }
    function chooseRealShow(axisValue,axis){
        let setValue = 0;
        if(axis === 0){
          setValue = 0
        }else if(axis===1){
          setValue = 1
        }
        //before do function
        console.log("axisValue : ",axisValue);
        console.log("axis : ",setValue + " axis :",axis);
        if(axisValue ==="Location"){
          storageAxis[setValue] = location
        }
        else if(axisValue === "New cases"){
          storageAxis[setValue] = newCase
        }
        else if(axisValue === "Total cases"){
          storageAxis[setValue] = totalCase
        }
        else if(axisValue === "New deaths"){
          storageAxis[setValue] = newDeath
        }
        else if(axisValue === "Total deaths"){
          storageAxis[setValue] = death
        }
        else if(axisValue === "Date"){
          storageAxis[setValue] = date
        }
        else{
          storageAxis[setValue] = location
        }
    }
    console.log("x : ",x);
    console.log("y : ",y);
    pullAllValue();
    chooseRealShow(x,0);
    chooseRealShow(y,1);
   







    const dataBar = {
      labels: storageAxis[0],
      datasets: [
        {
          label: "Total Case",
          backgroundColor: "#EC932F",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: storageAxis[1],
        },
        {
          label: "new Cases",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: newCase,
        },
        {
          label: "new Death",
          backgroundColor: "red",
          borderColor: "red",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: death,
        },
      ],
    };
    const optionx = {
      indexAxis: "y",
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "white",
          },
        },
        zoom: {
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true
            },
            mode: 'xy',

          },
          pan: {
            enabled: true,
            mode: 'x',
          },
        }
      },
      scales: {
        y: {
          ticks: {
            color: "white",
          },
          title: {
            display: true,
            text: "y-axis",
            color: "white",
          },
        },
        x: {
          ticks: {
            color: "white",
          },
          title: {
            display: true,
            text: "x-axis",
            color: "white",
          },
        },
      },
    };
    const optiony = {
      indexAxis: "x",
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "white",
          },
        },
      },
      scales: {
        y: {
          ticks: {
            color: "white",
          },
          title: {
            display: true,
            text: "y-axis",
            color: "white",
          },
        },
        x: {
          ticks: {
            color: "white",
          },
          title: {
            display: true,
            text: "x-axis",
            color: "white",
          },
        },
      },
    };
    return (
      <div style={{ marginTo: "30%" }}>
        <div className="bar-header">
          <p
            className={
              verticalBar === true ? "typeBar-active" : "typeBar-non-active"
            }
            onClick={() => changeBarType(true)}
          >
            Vertical Display
          </p>
          <p
            className={
              verticalBar === false ? "typeBar-active" : "typeBar-non-active"
            }
            onClick={() => changeBarType(false)}
          >
            Horizontal Display
          </p>
        </div>
        {/* if(verticalBar === true){
          <Bar data={dataBar}/>
        } */}
        {verticalBar === true ? (
          <Bar data={dataBar} options={optiony} />
        ) : (
          <Bar data={dataBar} options={optionx} />
        )}
      </div>
    );
  } else if (chosen === "Radar") {
    const data = {
      labels: [
        "Eating",
        "Drinking",
        "Sleeping",
        "Designing",
        "Coding",
        "Cycling",
        "Running",
      ],
      datasets: [
        {
          label: "My First Dataset",
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
        },
        {
          label: "My Second Dataset",
          data: [28, 48, 40, 19, 96, 27, 100],
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)",
        },
      ],
    };
    const options = {
      scales: {
        maintainAspectRatio: false,
      },
    };
    return (
      <div style={{ width: "100%" }}>
        <Radar
          data={data}
          width={"100%"}
          height={"500px"}
          options={{
            maintainAspectRatio: false,
            scales: {
              r: {
                ticks: {
                  color: "white",
                  backdropColor: "#343A40",
                  maxTicksLimit: "3",
                },
                grid: {
                  color: "black",
                },
                angleLines: {
                  color: "black",
                },
                pointLabels: {
                  color: "white",
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: "white",
                },
              },
              
              
            },
          }}
        />
      </div>
    );
  } else if (chosen === "Scatter") {
    const data = {
      datasets: [
        {
          label: "Dataset 1",
          data: [
            { x: 100, y: 1 },
            { x: 1, y: 2 },
          ],
          backgroundColor: "#F39C12",
        },
        {
          label: "Dataset 2",
          data: [
            { x: 4, y: 5 },
            { x: 6, y: 7 },
          ],
          backgroundColor: "#DC3545",
        },
      ],
    };
    return (
      <div style={{ marginTop: "4%" }}>
        <Scatter
          data={data}
          options={{
            plugins: {
              legend: {
                display: true,

                labels: {
                  color: "white",
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  color: "white",
                },
                title: {
                  display: true,
                  text: y,
                  color: "white",
                },
              },
              x: {
                ticks: {
                  color: "white",
                },
                title: {
                  display: true,
                  text: x,
                  color: "white",
                },
              },
            },
          }}
        />
      </div>
    );
  }
  else{
      return  (
        <div>
          <button>
              Visualization 
          </button>
        </div>
      )
  }
};

const SubChart = (props) => {
  const graphType = props.graphType;
  const dataGraph = props.dataGraph;
  const [currentChart, setcurrentChart] = useState(graphType);
  const [disableChart, setdisableChart] = useState("true");
  const [valueDate, setValueDate] = useState("");
  let usedDataDate =""

  function changeChart(nameChart) {
    setcurrentChart(nameChart);
  }


  useEffect(async() => {
    changeChart(props.graphType);
    if (props.x === "" || props.y === "") {
      setdisableChart("true");
    } else {
      setdisableChart("false");
    }
  
    
 
  }, [props.graphType, props.x, props.y,valueDate]);
  const BtnDisplay =()=> {
      if(valueDate !== ""){
      return(
          <div className="header-font">
          <button     
            className={currentChart === "Line" ? "active-btn" : "btn-chart"}
            onClick={() => changeChart("Line")}
          >
            Line
          </button>
          {/* <button
            className={currentChart === "Pie" ? "active-btn" : "btn-chart"}
            onClick={() => changeChart("Pie")}
          >
            Pie
          </button> */}
          <button
            className={currentChart === "Bar" ? "active-btn" : "btn-chart"}
            onClick={() => changeChart("Bar")}
          >
            Bar
          </button>
          {/* <button
            className={currentChart === "Radar" ? "active-btn" : "btn-chart"}
            onClick={() => changeChart("Radar")}
          >
            Radar
          </button> */}
          <button
            className={currentChart === "Scatter" ? "active-btn" : "btn-chart"}
            onClick={() => changeChart("Scatter")}
          >
            Scatter
          </button>
        </div>
   
      )
      }  
      else{
        return(
          <div className="header-font">
          <button     
            className="disableButton"
          >
            Line
          </button>
          {/* <button
            className={currentChart === "Pie" ? "active-btn" : "btn-chart"}
            onClick={() => changeChart("Pie")}
          >
            Pie
          </button> */}
          <button
            className="disableButton"
          >
            Bar
          </button>
          {/* <button
            className={currentChart === "Radar" ? "active-btn" : "btn-chart"}
            onClick={() => changeChart("Radar")}
          >
            Radar
          </button> */}
          <button
            className="disableButton"
          >
            Scatter
          </button>
        </div>
        )
      }
    
  }
  return (
    <div className="containChart">
      <div className="dateSelectContainer">
      <SelectDate  valueDate={valueDate}  setValueDate={setValueDate} />
      </div>
      <div className="top-content">
        {/* */}
        <div className="header-font">
          Visualize data between {props.x} and {props.y} 
          {/* {disableChart}{" "} */}
        </div>


    <BtnDisplay/>



      </div>
      <hr style={{ backgroundColor: "black" }}></hr>
     
      <div className="btm-content"  >
        {/* {currentChart == "Bar" ? <div>Bar</div> :currentChart=="Pie"?<div>Pie</div>:<div>Soon</div>} */}
        <Swap
          dateData = {usedDataDate}
          chosen={currentChart}
          disableChart={disableChart}
          x={props.x}
          y={props.y}
          dataGraph={dataGraph}
          valueDate = {valueDate}
          style={{ width: "100%", overflowX: "auto" }}
        />
     
     
     
      </div>
   
   
   
   
    </div>
  );
};

export default SubChart;
