
import React, { useEffect, useState } from "react";
import { Chart } from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "../css/subChart.css";
import zoomPlugin from "chartjs-plugin-zoom";
import SelectDate from "./SelectDate";
import {fetchDate, fetchPie } from "../api/apiCountrySelection";
import { fecthDateApi } from "../api/apiDate";
import loadingIcon from "../img/icon/loading.svg";
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
  country
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
    return a;
  });
  console.log("dateProp[0]",dateProp[0])
  async function changeValueArray() {
    optionSelect.map((val, index) => {
      if (val.name === "New cases") {
        return (val.data = newCase);
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
    // console.log("after change value : ",optionSelect);
  }
  chooseRealShow(x, 0);
  chooseRealShow(y, 1);
  function filterCountry(){
    selectedCountry = country.filter((value) => {
      return value.selected === true;
    });
  }
  useEffect(async () => {
    console.log("from subchart : ",country)
    //filter country
    filterCountry()
    
    setisLoading(true);

    await fetchDate(valueDate,selectedCountry[0].country).then((keepData) => {
      setdateProp(keepData.data);
      console.log("result : ",dateProp)
      if (keepData.data[0]?.result.length === 0) {
        setwrongData(true);
      } else {
        setwrongData(false);
      }
    });

    // allDate = await fecthThAPI();
    // setdateSelect(allDate);
    changeValueArray();

    await fecthDateApi(valueDate,selectedCountry[0].country).then((value) => {
      setdateMultiSelect(value.data);
    });
    await fetchPie(valueDate,selectedCountry[0].country).then((value) => {
      setdialyPieData(value.data);
    });

    setisLoading(false);
  }, [valueDate,country]);
  //total death,total cases,new cases,new death

  //set line filter
  optionMultiSelect = optionSelect.filter((value) => {
    return value.selected === true;
  });
  
  optionMultiSelect = optionMultiSelect.map((item) => {
    let { name: label, ...rest } = item;
    return { label, ...rest };
  });

  let colorArray = ["red", "blue", "orange", "green"];
  optionMultiSelect = optionMultiSelect.map((item, index) => ({
    ...item,
    backgroundColor: colorArray[index],
    borderColor: colorArray[index],
  }));
  console.log("option : ",optionMultiSelect)
  testMulti = optionMultiSelect.map((obj) => ({ ...obj, yAxisID: null }));

  testMulti.map((val) => {
    if (val.label === "Total deaths") {
      val.yAxisID = "A";
    } else if (val.label === "Total cases") {
      val.yAxisID = "A";
    } else if (val.label === "New cases") {
      val.yAxisID = "B";
    } else if (val.label === "New deaths") {
      val.yAxisID = "B";
    }
  });

  testMulti.map((check) => {
    if (check.label === "New cases" || check.label === "New deaths") {
      multipleAxis = true;
    } else {
      multipleAxis = false;
    }
  });

  testMulti.map((check) => {
    if (check.label === "Total deaths" || check.label === "Total cases") {
      isToomuch = true;
    }
  });

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
      val.yAxisID = "A";
    } else if (val.label === "Total cases") {
      val.yAxisID = "A";
    } else if (val.label === "New cases") {
      val.yAxisID = "B";
    } else if (val.label === "New deaths") {
      val.yAxisID = "B";
    }
  });
  weeklydateContain.map((check) => {
    if (check.label === "New cases" || check.label === "New deaths") {
      dateRightAxis = true;
    } else {
      dateRightAxis = false;
    }
  });
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
            backgroundColor: ["red", "green", "blue", "orange  "],
          },
        ],
      };

      if (isLoading === true) {
        return (
          <div>
            <div>
              <img
                src={loadingIcon}
                width="60px"
                style={{
                  paddingTop: "0px",
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
    } else {
      return <div>can not visulize pie chart with x axis</div>;
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
                style={{
                  paddingTop: "0px",
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
                      min:0
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
    } else if (optionSelectx[0].selected === true) {
      const data = {
        //x label //location
        labels: storageAxis[0],
        datasets: testMulti,
        // labels:testX,
        // datasets:testY
      };
      console.log("staxss : ",storageAxis)
      console.log("testMulti : ",testMulti)


      if (isLoading === true) {
        return (
          <div>
            <div>
              <img
                src={loadingIcon}
                width="60px"
                style={{
                  paddingTop: "0px",
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
      return <div>cant visualize</div>;
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
                style={{
                  paddingTop: "0px",
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
                    },

                    y: {
                      ticks: {
                        color: "white",
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
                      },
                    },
                    y: {
                      ticks: {
                        color: "white",
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
                style={{
                  paddingTop: "0px",
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
      return <div> cannot visulza</div>;
    }
  } else {
    return (
      <div>
        <div>
          <div>
            <img
              src={loadingIcon}
              width="60px"
              style={{
                paddingTop: "0px",
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
  let usedDataDate = "";

  function changeChart(nameChart) {
    setcurrentChart(nameChart);
  }
  function changeMultiSelect() {
    setmultiSelect(!multiSelect);
  }
  useEffect(async () => {
    // if(currentChart ==="Pie"){
    //   optionSelect =  optionSelect.map((p)=>p.selected === false ?{...p,selected:true}:p)
    // }
  }, [dataGraph, x, y, valueDate, optionSelectx]);

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
          {/* <button
            className={currentChart === "Radar" ? "active-btn" : "btn-chart"}
            onClick={() => changeChart("Radar")}
          >
            Radar
          </button> */}
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
          <SelectDate valueDate={valueDate} setValueDate={setValueDate} />
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
        />
      </div>
    </div>
  );
};

export default SubChart;
