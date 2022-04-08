import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { Chart } from "chart.js";
import { Bar, Doughnut, Line, Radar, Scatter } from "react-chartjs-2";
import HorizontalBar from "react-chartjs-2";
import "../css/subChart.css";
import { YAxis } from "recharts";
import zoomPlugin from "chartjs-plugin-zoom";
import SelectDate from "./SelectDate";
import { fecthThAPI, fetchDateth } from "../api/apiCountrySelection";
import { async } from "q";


Chart.register(zoomPlugin); // REGISTER PLUGIN

const Swap = ({
  chosen,
  disableChart,
  x,
  y,
  dataGraph,
  valueDate,
  dateD0ata,
  setcurrentChart,
}) => {
  let keepData = "";
  let allDate;
  let currentState;
  const [dateProp, setdateProp] = useState("");
  const [dateSelect, setdateSelect] = useState("");
  const [verticalBar, setverticalBar] = useState(true);
  const [apiWait, setapiWait] = useState(false);
  let apidata = dateProp[0];
  let newCase = [];
  let totalCase = [];
  let location = [];
  let date = [];
  let newDeath = [];
  let death = [];
  let storageAxis = [" ", " "];

  function pullAllValue() {
    newCase = apidata?.result.map((val) => {
      let a = val.newCase;
      return a;
    });
    location = apidata?.result.map((val) => {
      let a = val.location;
      // console.log(a);
      return a;
    });
    totalCase = apidata?.result.map((val) => {
      let a = val.totalCase;
      // console.log(a);
      return a;
    });
    newDeath = apidata?.result.map((val) => {
      let a = val.newDeath;
      // console.log(a);
      return a;
    });
    death = apidata?.result.map((val) => {
      let a = val.death;
      // console.log(a);
      return a;
    });
  }

  function chooseRealShow(axisValue, axis) {
    let setValue = 0;
    if (axis === 0) {
      setValue = 0;
    } else if (axis === 1) {
      setValue = 1;
    }
    if (axisValue === "Location") {
      storageAxis[setValue] = location;
    } else if (axisValue === "New cases") {
      storageAxis[setValue] = newCase;
    } else if (axisValue === "Total cases") {
      storageAxis[setValue] = totalCase;
    } else if (axisValue === "New deaths") {
      storageAxis[setValue] = newDeath;
    } else if (axisValue === "Total deaths") {
      storageAxis[setValue] = death;
    } else if (axisValue === "Date") {
      storageAxis[setValue] = date;
    } else {
      storageAxis[setValue] = location;
    }
  }
  pullAllValue();
  chooseRealShow(x, 0);
  chooseRealShow(y, 1);

  useEffect(async () => {
   
    await fetchDateth(valueDate).then((keepData)=>{
      setapiWait(true)
      setdateProp(keepData.data);
        setapiWait(false)
        console.log("success laodidng : ",apiWait);
    })
   

    allDate = await fecthThAPI();
    setdateSelect(allDate);
    // setdateProp(keepData.data);
  }, [valueDate]);

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

    const data = {
      //x label
      labels: storageAxis[0],
      datasets: [
        {
          label: "First dataset",
          //y label
          data: storageAxis[1],
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
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true, // SET SCROOL ZOOM TO TRUE
                  },
                  mode: "x",
                  speed: 100,
                },
                pan: {
                  enabled: true,
                  mode: "x",
                  speed: 100,
                },
              },
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
                  autoSkip: true,
                },
              },
              x: {
                ticks: {
                  color: "white",
                  //data can show all province but space in x axis is too low
                  autoSkip: true,
                },
              },
            },
          }}
        />
      </div>
    );
  } else if (chosen === "Bar") {
    function changeBarType(bool) {
      setverticalBar(bool);
    }

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
        // {
        //   label: "new Cases",
        //   backgroundColor: "rgba(255,99,132,0.2)",
        //   borderColor: "rgba(255,99,132,1)",
        //   borderWidth: 1,
        //   hoverBackgroundColor: "rgba(255,99,132,0.4)",
        //   hoverBorderColor: "rgba(255,99,132,1)",
        //   data: newCase,
        // },
        // {
        //   label: "new Death",
        //   backgroundColor: "red",
        //   borderColor: "red",
        //   borderWidth: 1,
        //   hoverBackgroundColor: "rgba(255,99,132,0.4)",
        //   hoverBorderColor: "rgba(255,99,132,1)",
        //   data: death,
        // },
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
              enabled: true,
            },
            mode: "xy",
          },
          pan: {
            enabled: true,
            mode: "x",
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
    const optiony = {
      indexAxis: "x",
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
              enabled: true,
            },
            mode: "xy",
          },
          pan: {
            enabled: true,
            mode: "x",
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
  } else {
    return (
      <div>
        <button>Visualization</button>
      </div>
    );
  }
};

const SubChart = (props) => {
  const dataGraph = props.dataGraph;
  const [currentChart, setcurrentChart] = useState(null);
  const [disableChart, setdisableChart] = useState("true");
  const [valueDate, setValueDate] = useState("");
  let usedDataDate = "";

  function changeChart(nameChart) {
    setcurrentChart(nameChart);
  }

  useEffect(async () => {
    if (props.x === "" || props.y === "") {
      setdisableChart("true");
    } else {
      setdisableChart("false");
    }
  }, [props.graphType, props.x, props.y, valueDate]);
  const BtnDisplay = () => {
    if (valueDate !== "") {
      return (
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
      );
    } else {
      return (
        <div className="header-font">
          <button className="disableButton">Line</button>
          {/* <button
            className={currentChart === "Pie" ? "active-btn" : "btn-chart"}
            onClick={() => changeChart("Pie")}
          >
            Pie
          </button> */}
          <button className="disableButton">Bar</button>
          {/* <button
            className={currentChart === "Radar" ? "active-btn" : "btn-chart"}
            onClick={() => changeChart("Radar")}
          >
            Radar
          </button> */}
          <button className="disableButton">Scatter</button>
        </div>
      );
    }
  };
  return (
    <div className="containChart">
      <div className="dateSelectContainer">
        <SelectDate valueDate={valueDate} setValueDate={setValueDate} />
      </div>
      <div className="top-content">
        {/* */}
        <div className="header-font">
          Visualize data between {props.x} and {props.y}
          {/* {disableChart}{" "} */}
        </div>

        <BtnDisplay />
      </div>
      <hr style={{ backgroundColor: "black" }}></hr>

      <div className="btm-content">
        {/* {currentChart == "Bar" ? <div>Bar</div> :currentChart=="Pie"?<div>Pie</div>:<div>Soon</div>} */}
        <Swap
          dateData={usedDataDate}
          chosen={currentChart}
          setcurrentChart={setcurrentChart}
          disableChart={disableChart}
          x={props.x}
          y={props.y}
          dataGraph={dataGraph}
          valueDate={valueDate}
          style={{ width: "100%", overflowX: "auto" }}
        />
      </div>
    </div>
  );
};

export default SubChart;
