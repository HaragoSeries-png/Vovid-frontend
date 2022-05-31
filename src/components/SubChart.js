
import React, { useEffect, useState } from "react";
import { Chart } from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "../css/subChart.css";
import zoomPlugin from "chartjs-plugin-zoom";
import SelectDate from "./SelectDate";
import {fetchData, fetchPie } from "../api/apiCountrySelection";
import { fecthDateApi } from "../api/apiDate";
import loadingIcon from "../img/icon/loading.svg";
import sorryIcon from "../img/icon/sorry.png";
import ascending from "../img/icon/acd2.png";
import decesding from "../img/icon/dec2.png";
import default_graph from "../img/icon/gen2.png"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
  optionSelect,
  multiSelect,
  setxAxis,
  setyAxis,
  setoptionSelect,
  optionSelectx,
  country,
  sortType,
  orderType
}) => {
  
  const [dateProp, setdateProp] = useState("");

  const [verticalBar, setverticalBar] = useState(true);
  let apidata = dateProp[0];
  let [newCase, setnewCase] = useState([]);
  let [totalCase, settotalCase] = useState([]);
  let [location, setlocation] = useState([]);
  let [newDeath, setnewDeath] = useState([]);
  let [death, setdeath] = useState([]);
  let [optionMultiSelect, setoptionMultiSelect] = useState(null);
  let [dialyPieData, setdialyPieData] = useState();
  let pieDataContain;
  let dialyPieLabel = [];
  let dialyPieValue = [];
  let weeklydateContain;
  let [dateMultiSelect, setdateMultiSelect] = useState(null);
  var barweeklyContain;
  const [isLoading, setisLoading] = useState(false);
  var testMulti;
  var date = [];
  const [wrongData, setwrongData] = useState(false);
  var multipleAxis = false;
  var isToomuch = false;
  var dateRightAxis = false;
  var selectedCountry
  let storageAxis = [" ", " "];

  if(apidata?.result){
    newCase = apidata?.result.map((val) => {
    let a = val.newCase;
    return a;
  });

  location = apidata?.result.map((val) => {
    let a = val.location;

    return a;
  });
  totalCase = apidata?.result.map((val) => {
    let a = val.totalCase;
 
    return a;
  });
  newDeath = apidata?.result.map((val) => {
    let a = val.newDeath;
 
    return a;
  });
  death = apidata?.result.map((val) => {
    let a = val.death;
    return a;
  });

}
  async function changeValueArray() {
    optionSelect.map((val, index) => {
      if (val.name === "New cases") {
        return val.data = newCase;
      } else if (val.name === "Total cases") {
        return (val.data = totalCase);
      } else if (val.name === "New deaths") {
        return (val.data = newDeath);
      } else if (val.name === "Total deaths") {
        return (val.data = death);
      }
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
  if (multiSelect === true) {
    changeValueArray();

  }
  chooseRealShow(x, 0);
  chooseRealShow(y, 1);
  function filterCountry(){
    selectedCountry = country.filter((value) => {
      return value.selected === true;
    });
  }
  
  useEffect(async () => {
    
    //filter country
    filterCountry()
    
    setisLoading(true);

    await fetchData(valueDate,selectedCountry[0].country,sortType,orderType).then((keepData) => {
      setTimeout(() => {
        setdateProp(keepData.data);
        if(keepData.data[0]?.result){
        if (keepData.data[0]?.result.length === 0 ||keepData.data[0]?.result === undefined ||keepData.data[0]?.result === null) {
          setwrongData(true);
        } else {
          setwrongData(false);
        }
      }
      }, 1000);  
 
    });
    
    changeValueArray();

    await fecthDateApi(valueDate,selectedCountry[0].country).then((value) => {
      setdateMultiSelect(value.data);
    });
    await fetchPie(valueDate,selectedCountry[0].country).then((value) => {
      setdialyPieData(value.data);
    });

    setisLoading(false);
  }, [valueDate,country,orderType]);
  //total death,total cases,new cases,new death

  //set line filter
  optionMultiSelect = optionSelect.filter((value) => {
    return value.selected === true;
  });

  optionMultiSelect = optionMultiSelect.map((item) => {
    let { name: label, ...rest } = item;
    return { label, ...rest };
  });


  let colorArray = ["RGBA(255, 99, 71,1)", "blue", "orange", "#bc5090"];


  optionMultiSelect = optionMultiSelect.map((item, index) => ({
    ...item,
    backgroundColor: colorArray[index],
    borderColor: colorArray[index],
  }));
  
  testMulti = optionMultiSelect.map((obj) => ({ ...obj, yAxisID: null }));

  testMulti.map((val) => {
    if (val.label === "Total deaths") {
      val.yAxisID = "B";
    } else if (val.label === "Total cases") {
      val.yAxisID = "A";
      val.fill = true;
      val.backgroundColor = "RGBA(255, 99, 71,0.2)"
    } else if (val.label === "New cases") {
      val.yAxisID = "B";
    } else if (val.label === "New deaths") {
      val.yAxisID = "B";
    }
  });

  testMulti.map((check) => {
    if (check.label === "New cases" || check.label === "New deaths" || check.label ==="Total deaths") {
      multipleAxis = true;
    } else {
      multipleAxis = false;
    }
  });

  testMulti.map((check) => {
    if (check.label === "Total cases") {
      isToomuch = true;
    }
  });


  // if(testSort){
  // testSort.sort(function(a,b){
  //   return b-a
  // })
  // }
  
  //handle pie dialy data
  //data format

  // data :[
  //   {
  //  name : String,
  //  value : number
  //   }
  //  ]
  pieDataContain = optionSelect.filter((value) => {
    return value.selected === true;
  });
  pieDataContain.map((val) => {
    if (val.name === "New deaths") {
      return (val.data = dialyPieData?.new_deaths);
    } else if (val.name === "Total deaths") {
      return (val.data = dialyPieData?.total_deaths);
    } else if (val.name === "Total cases") {
      return (val.data = dialyPieData?.total_cases);
    } else if (val.name === "New cases") {
      return (val.data = dialyPieData?.new_cases);
    }
  });

  pieDataContain.filter((value) => {
    dialyPieLabel.push(value.name);
  });

  pieDataContain.filter((value) => {
    dialyPieValue.push(value.data);
  });

  weeklydateContain = optionSelect.filter((value) => {
    return value.selected === true;
  });

  let newCaseDate = [];
  let newDeathDate = [];
  let totalCaseDate = [];
  let totalDeathsDate = [];
  let xlabelDate = [];
  dateMultiSelect?.map((val) => {
    if (val.new_cases !== "") {
      newCaseDate.push(val.new_cases);
    }
    if (val.new_deaths !== "") {
      newDeathDate.push(val.new_deaths);
    }
    if (val.total_cases !== "") {
      totalCaseDate.push(val.total_cases);
    }
    if (val.total_deaths !== "") {
      totalDeathsDate.push(val.total_deaths);
    }
  });
  newCaseDate = newCaseDate.reverse();
  newDeathDate = newDeathDate.reverse();
  totalCaseDate = totalCaseDate.reverse();
  totalDeathsDate = totalDeathsDate.reverse();

  // date weekly label
  weeklydateContain.map((val) => {
    if (val.name === "Total deaths") {
      val.data = totalDeathsDate;
    }
    if (val.name === "Total cases") {
      val.data = totalCaseDate;
    }
    if (val.name === "New cases") {
      val.data = newCaseDate;
    }
    if (val.name === "New deaths") {
      val.data = newDeathDate;
    }
  });
  //date for x label
  dateMultiSelect?.map((val) => {
    xlabelDate.push(val.date);
  });
  xlabelDate = xlabelDate.reverse();
  weeklydateContain = weeklydateContain.map((item) => {
    let { name: label, ...rest } = item;
    return { label, ...rest };
  });

  weeklydateContain = weeklydateContain.map((item, index) => ({
    ...item,
    backgroundColor: colorArray[index],
    borderColor: colorArray[index],
  }));

  barweeklyContain = weeklydateContain;
  weeklydateContain = weeklydateContain.map((obj) => ({
    ...obj,
    yAxisID: null,
  }));
  weeklydateContain.map((val) => {
    if (val.label === "Total deaths") {
      val.yAxisID = "B";
    } else if (val.label === "Total cases") {
      val.yAxisID = "A";
    } else if (val.label === "New cases") {
      val.yAxisID = "B";
    } else if (val.label === "New deaths") {
      val.yAxisID = "B";
    }
  });
  weeklydateContain.map((check) => {
    if (check.label === "New cases" || check.label === "New deaths" || check.label ==="Total deaths") {
      dateRightAxis = true;
    } else {
      dateRightAxis = false;
    }
  });

  
  weeklydateContain.map((val)=>{
    if(val.label === "Total cases"){
      val.fill = false
    }
  })
  if (chosen === "Pie") {

    if (
      optionSelectx[0].selected === false &&
      optionSelectx[1].selected === false
    ) {
      const data = {
        labels: dialyPieLabel,
        datasets: [
          {
            data: dialyPieValue,
            backgroundColor: ["red", "#bc5090", "blue", "orange  "],
          },
        ],
      };
      console.log("pie value : ",dialyPieValue)
      if (isLoading === true) {
        return (
          <div>
            <div>
              <img
                src={loadingIcon}
                width="60px"
                alt=""
                style={{
           
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "200px",
                  paddingTop: "11%",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                marginTop: "-25px",
              }}
            >
              Loading. . .
            </div>
          </div>
        );
      } 
      else {
        if(dialyPieValue.length ==0){
          return(
            <div>
            <div>
              <img
                src={sorryIcon}
                width="60px"
                alt=""
                style={{
          
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "200px",
                  paddingTop: "11%",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                marginTop: "25px",
              }}
            >
             Sorry, please selecte feature in Y-Axis.
            </div>
          </div>
          )
        }else{
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
        }
      }
    } else {
      return (
        <div>
            <div>
              <img
                src={sorryIcon}
                width="60px"
                alt=""
                style={{
          
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "200px",
                  paddingTop: "11%",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                marginTop: "25px",
              }}
            >
             Sorry, Data is not compatible with selected feature.
            </div>
          </div>
      );
    }
  } else if (chosen === "Line") {
    if (optionSelectx[1].selected === true) {
      const data = {
        //x label //date
        labels: xlabelDate,
        datasets: weeklydateContain,
      };
   
      if (isLoading === true) {
        return (
          <div>
            <div>
              <img
                src={loadingIcon}
                width="60px"
                alt=""
                style={{
               
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "200px",
                  paddingTop: "11%",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                marginTop: "-25px",
              }}
            >
              Loading. . .
            </div>
          </div>
        );
      } else {
        //only is total
        if (isToomuch === true && multipleAxis === false) {
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
                      display: true,

                      labels: {
                        color: "white",
                      },
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: "white",
                        //data can show all province but space in x axis is too low
                        autoSkip: true,
                      },
                    },
      
                    A: {
                      type: "linear",
                      display: true,
                      position: "left",
                      title: {
                        display: true,
                        text: "คน",
                        color: "white",
                      },

                      ticks: {
                        color: "white",
                      
                      },
                      
                    },
                  },
                }}
              />
            </div>
          );
        } else {
          //2 y axis
          if (isToomuch === true && multipleAxis === true) {
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
                        display: true,

                        labels: {
                          color: "white",
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          color: "white",
                          //data can show all province but space in x axis is too low
                          autoSkip: true,
                        },
                      },
                     
                      A: {
                        type: "linear",
                        display: true,
                        position: "left",
                        title: {
                          display: true,
                          text: "คน",
                          color: "white",
                        },
                        ticks: {
                          color: "white",
                          beginAtZero: true
                        },
                        min:0
                      },
                      B: {
                        type: "linear",
                        display: true,
                        position: "right",
                        title: {
                          display: true,
                          text: "คน",
                          color: "white",
                        },
                        ticks: {
                          color: "white",
                          beginAtZero: true
                        },
                        min:0
                      },
                    },
                  }}
                />
              </div>
            );
          } else {
            console.log("eieiei")
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
                        display: true,

                        labels: {
                          color: "white",
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          color: "white",
                          //data can show all province but space in x axis is too low
                          autoSkip: true,
                        },
                      },

                      B: {
                        type: "linear",
                        display: true,
                        position: "left",
                        title: {
                          display: true,
                          text: "คน",
                          color: "white",
                        },
                        ticks: {
                          color: "white",
                        },
                        
                      },
                    },
                  }}
                />
              </div>
            );
          }
        }
      }
    } else if (optionSelectx[0].selected === true) {

      const data = {
        //x label //location
        labels: storageAxis[0],
        datasets: testMulti,
        // labels:testX,
        // datasets:testY
      };
        //loading
      if (isLoading === true) {
        return (
          <div>
            <div>
              <img
                src={loadingIcon}
                width="60px"
                alt=""
                style={{
                  
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "200px",
                  paddingTop: "11%",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                marginTop: "-25px",
              }}
            >
              Loading. . .
            </div>
          </div>
        );
      } else {
        //data exist
        
        if (wrongData === true) {
          return(
            <div>
            <div>
              <img
                src={sorryIcon}
                width="60px"
                alt=""
                style={{
            
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "200px",
                  paddingTop: "11%",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                marginTop: "25px",
              }}
            >
             Sorry, Data is not update please try again
            </div>
          </div>
          ) 
          
        } else {
          if (multipleAxis === true) {
            if (testMulti.length <= 2 && !isToomuch) {
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
                          display: true,

                          labels: {
                            color: "white",
                          },
                        },
                      },
                      scales: {
                        x: {
                          ticks: {
                            color: "white",
                            //data can show all province but space in x axis is too low
                            autoSkip: true,
                          },
                        },

                        B: {
                          type: "linear",
                          display: true,
                          position: "left",
                          title: {
                            display: true,
                            text: "คน",
                            color: "white",
                          },
                          ticks: {
                            color: "white",
                            precision:0
                          },
                          min:0
                        },
                      },
                    }}
                  />
                </div>
              );
            } else {
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
                          display: true,

                          labels: {
                            color: "white",
                          },
                        },
                      },
                      scales: {
                        x: {
                          ticks: {
                            color: "white",
                            //data can show all province but space in x axis is too low
                            autoSkip: true,
                          },
                        },
                        A: {
                          type: "linear",
                          display: true,
                          position: "left",
                          title: {
                            display: true,
                            text: "คน",
                            color: "white",
                          },
                          ticks: {
                            color: "white",
                          },
                          min:0
                        },
                        B: {
                          type: "linear",
                          display: true,
                          position: "right",
                          title: {
                            display: true,
                            text: "คน",
                            color: "white",
                          },
                          ticks: {
                            color: "white",
                            precision: 0
                          },
                          min:0
                        },
                      },
                    }}
                  />
                </div>
              );
            }
          } else {
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
                        display: true,

                        labels: {
                          color: "white",
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          color: "white",
                          //data can show all province but space in x axis is too low
                          autoSkip: true,
                        },
                      },
                      A: {
                        type: "linear",
                        display: true,
                        position: "left",
                        title: {
                          display: true,
                          text: "คน",
                          color: "white",
                        },
                        ticks: {
                          color: "white",
                        },
                        min:0
                      },
                      B: {
                        type: "linear",
                        display: false,
                        position: "right",
                        title: {
                          display: true,
                          text: "คน",
                          color: "white",
                        },
                        ticks: {
                          color: "white",
                        },
                        min:0
                      },
                    },
                  }}
                />
              </div>
            );
          }
        }
      }
    } else {
      return(
        <div>
            <div>
              <img
                src={sorryIcon}
                width="60px"
                alt=""
                style={{
                
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "200px",
                  paddingTop: "11%",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                marginTop: "25px",
              }}
            >
             Can not visualize , please select feature in X-Axis.
            </div>
          </div>
      );
    }
  } else if (chosen === "Bar") {
    function changeBarType(bool) {
      setverticalBar(bool);
    }

    if (optionSelectx[1].selected === true) {

      const dataBar = {
        labels: xlabelDate,
        datasets: barweeklyContain,
      };
 
      if (isLoading === true) {
        return (
          <div>
            <div>
              <img
                src={loadingIcon}
                width="60px"
                alt=""
                style={{
         
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "200px",
                  paddingTop: "11%",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                marginTop: "-25px",
              }}
            >
              Loading. . .
            </div>
          </div>
        );
      } else {
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
                  verticalBar === false
                    ? "typeBar-active"
                    : "typeBar-non-active"
                }
                onClick={() => changeBarType(false)}
              >
                Horizontal Display
              </p>
            </div>

            {verticalBar === true ? (
              <Bar
                data={dataBar}
                options={{
                  indexAxis: "x",
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
                      limits: {
                        min: "original",
                      },
                    },
                    legend: {
                      display: true,

                      labels: {
                        color: "white",
                      },
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: "white",
                        //data can show all province but space in x axis is too low
                        autoSkip: true,
                      },
                      title:{
                        display:true,
                        text:"วันที่ 7 วันย้อนหลัง",
                        color:"white"
                      }
                    },

                    y: {
                      ticks: {
                        color: "white",
                        precision:0
                      },
                      title:{
                        display:true,
                       
                        text:"คน",
                        color:"white"
                      },
                      min:0
                    },
                  },
                }}
              />
            ) : (
              <Bar
                data={dataBar}
                options={{
                  indexAxis: "y",
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
                      limits: {
                        x: { min: 0 },
                        y: { min: 0 },
                      },
                    },
                    legend: {
                      display: true,

                      labels: {
                        color: "white",
                      },
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: "white",
                        //data can show all province but space in x axis is too low
                        autoSkip: true,
                        precision:0
                      },
                      title:{
                        display:true,
                        text:"คน",
                        color:"white"
                      }
                    },
                    y: {
                      ticks: {
                        color: "white",
                        precision:0
                      },
                      title:{
                        display:true,
                        text:"วันที่ 7 วันย้อนหลัง",
                        color:"white"
                      },
                      min:0
                    },
                  },
                }}
              />
            )}
          </div>
        );
      }
    } else if (optionSelectx[0]?.selected === true) {
      const dataBar = {
        labels: storageAxis[0],
        datasets: optionMultiSelect,
      };
      if (isLoading === true) {
        return (
          <div>
            <div>
              <img
                src={loadingIcon}
                width="60px"
                alt=""
                style={{
                 
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "200px",
                  paddingTop: "11%",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                marginTop: "-25px",
              }}
            >
              Loading. . .
            </div>
          </div>
        );
      } else {
        if (wrongData === true) {
          return <div>Data is not update</div>;
        } else {
          return (
            <div style={{ marginTo: "30%" }}>
              <div className="bar-header">
                <p
                  className={
                    verticalBar === true
                      ? "typeBar-active"
                      : "typeBar-non-active"
                  }
                  onClick={() => changeBarType(true)}
                >
                  Vertical Display
                </p>
                <p
                  className={
                    verticalBar === false
                      ? "typeBar-active"
                      : "typeBar-non-active"
                  }
                  onClick={() => changeBarType(false)}
                >
                  Horizontal Display
                </p>
              </div>

              {verticalBar === true ? (
                <Bar
                  data={dataBar}
                  options={{
                    indexAxis: "x",
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
                        limits: {
                          min: "original",
                        },
                      },
                      legend: {
                        display: true,

                        labels: {
                          color: "white",
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          color: "white",
                          //data can show all province but space in x axis is too low
                          autoSkip: true,
                        },
                      },
                      y: {
                        ticks: {
                          color: "white",
                          precision:0
                          },
                        
                      },
                    },
                  }}
                />
              ) : (
                <Bar
                  data={dataBar}
                  options={{
                    indexAxis: "y",
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
                        limits: {
                          x: { min: 0 },
                          y: { min: 0 },
                        },
                      },
                      legend: {
                        display: true,

                        labels: {
                          color: "white",
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          color: "white",
                          //data can show all province but space in x axis is too low
                          autoSkip: true,
                        },
                      },
                      y: {
                        ticks: {
                          color: "white",
                          precision:0
                        },
                      },
                    },
                  }}
                />
              )}
            </div>
          );
        }
      }
    } else {
      return <div>
                <div>
            <div>
              <img
                src={sorryIcon}
                width="60px"
                alt=""
                style={{
                
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "200px",
                  paddingTop: "11%",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "white",
                textAlign: "center",
                marginTop: "25px",
              }}
            >
             Can not visualize , please select feature in X-Axis.
            </div>
          </div>
      </div>;
    }
  } else {
    return (
      <div>
        <div>
          <div>
            <img
              src={loadingIcon}
              width="60px"
              alt=""
              style={{
              
                marginLeft: "auto",
                marginRight: "auto",
                width: "200px",
                paddingTop: "11%",
              }}
            />
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "white",
              textAlign: "center",
              marginTop: "-25px",
            }}
          >
            Loading. . .
          </div>
        </div>
      </div>
    );
  }
};

const SubChart = ({
  dataGraph,
  x,
  y,
  multiSelect,
  setmultiSelect,
  optionSelect,
  setxAxis,
  setyAxis,
  setoptionSelect,
  currentChart,
  setcurrentChart,
  optionSelectx,
  country
}) => {
  const [disableChart, setdisableChart] = useState("true");
  const [valueDate, setValueDate] = useState("");
  const [sortType, setsortType] = useState("")
  const [orderType, setorderType] = useState(" ")
  let usedDataDate = "";

  function changeChart(nameChart) {
    setcurrentChart(nameChart);
  }


  useEffect(async () => {
    console.log("st : ",sortType)
    
  }, [sortType]);
  const SortTypebtn= () =>{

    const handleChange = (event) => {
      setsortType(event.target.value);
      
    };
  return(
  <div className="sortContainer">
        <FormControl  variant="standard"  style={{width:"100%",height:"20px",marginTop:"0px",border:"0px"}}  >
        <Select
          value={sortType}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{fontColor:"orange"}}
          InputProps={{ disableUnderline: true }}
        >
          <MenuItem value="">
            Default
          </MenuItem>
          <MenuItem value="total-cases">Total cases</MenuItem>
          <MenuItem value="total-deaths">Total deaths</MenuItem>
          <MenuItem value="new-deaths">New deaths</MenuItem>
          <MenuItem value="new-cases">New cases</MenuItem>
        </Select>

      </FormControl>
  </div>
  )
}
const OrderControl = () =>{

  function handleChangeOrder(typeorder){
    setorderType(typeorder)
  }
  useEffect(() => {
    console.log("odt : ",orderType)
  }, [orderType])
  if(sortType !== ""){
  if(orderType == " "){
  return(
    <div>
        <div
        style={{borderRadias:"5px"}}
        onClick={() => handleChangeOrder("desc")}
        >
        <img
                src={default_graph}
                width="30px"
                alt=""
                style={{
                  backgroundColor:"orange",
                  padding:"2px",
                  borderRadias:"6px",
                  paddingTop:"4px"
                }}
              />
        </div>
    </div>
  )
  }else if(orderType =="asc"){
    return(
      <div>
         <div
        onClick={() => handleChangeOrder(" ")}
        style={{borderRadias:"5px"}}
        >
          <img
                src={ascending}
                width="30px"
                alt=""
                style={{
                  backgroundColor:"orange",
                  padding:"2px",
                  borderRadias:"6px",
                  width:"30px",
                  paddingTop:"4px"
                }}
              />
        </div>
      </div>
    )
  }else if(orderType =="desc"){
    return(
    <div>
       <div
        onClick={() => handleChangeOrder("asc")}
        style={{borderRadias:"5px"}}
        >
          <img
                src={decesding}
                width="30px"
                alt=""
                style={{
                  backgroundColor:"orange",
                  padding:"2px",
                  borderRadias:"6px",
                  paddingTop:"4px"
                }}
              />
        </div>
    </div>
    )
  }
}
else{
  return(
    <div>

    </div>
  )
}
}
const BooleanDisplay = ()=>{

  if(optionSelectx[1].selected == true || currentChart == "Pie"){
    return(
      <div>

      </div>
    )
  }
  else{
    return(
      <div style={{display:"flex"}}>
        <div className="btn-sorting-text">
            Sort by
            </div>
          <div className="btn-sorting" >
          < SortTypebtn   />
          </div>
          <div className="type-sorting">
          <OrderControl/>
          </div>

      </div>
    )
  }
}
  const BtnDisplay = () => {
    if (valueDate !== "") {
      return (
        
        <div className="header-font"  style={{width:"100%"}}>
          <div   style={{marginRight:"10%",marginLeft:"21%"}} >
          <button
            className={currentChart === "Line" ? "active-btn" : "btn-chart"}
              onClick={() => changeChart("Line")}
         
  >
            Line
          </button>
          <button
            className={currentChart === "Pie" ? "active-btn" : "btn-chart"}
            onClick={() => changeChart("Pie")}
          >
            Pie
          </button>
          <button
            className={currentChart === "Bar" ? "active-btn" : "btn-chart"}
            onClick={() => changeChart("Bar")}
          >
            Bar
          </button>
          </div>
          <BooleanDisplay />

          
        
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
        </div>
      );
    }
  };
  return (
    <div className="containChart">
      <div className="dateSelectContainer">
        <div>
          <div
            style={{
              display: "flex",
              color: "white",
              justifyContent: "flex-end",
            }}
          >
            <div></div>
          </div>
        </div>
      </div>
      <div className="top-content">
        {/* */}
        <div className="header-font">
          <SelectDate 
          valueDate={valueDate} 
          setValueDate={setValueDate}
          style={{borderRadias:"100px"}}
          />
          
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
          x={x}
          y={y}
          setxAxis={setxAxis}
          setyAxis={setyAxis}
          dataGraph={dataGraph}
          multiSelect={multiSelect}
          valueDate={valueDate}
          setoptionSelect={setoptionSelect}
          optionSelect={optionSelect}
          style={{ width: "100%", overflowX: "auto" }}
          optionSelectx={optionSelectx}
          country = {country}
          sortType = {sortType}
          orderType = {orderType}
        />
      </div>
    </div>
  );
};

export default SubChart;
