import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../api/apicount";
import { Line, Bar } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import "../css/mainFirstChart.css"
import { color, display } from "@mui/system";
const MainFirstChart = ({ data, country }) => {
  const [dailyData, setDailyData] = useState([]);

  // Similaire à componentDidMount et componentDidUpdate
  //useEffect cant be async so we create an async inside in order to call await function
  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  //displaying a barchart for a specific country
  const barchart = data.confirmed ? (
    <Bar style={{backgroundColor:"#343A40",height:"20%",padding:"1%"}}
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: ["People"],
            backgroundColor: [
              "#3093CC",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0,0.5)"
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value
            ]
          }
        ]
      }}
      options={{
        scales: {
          yAxes:{
              ticks:{
                  color: 'white',
                  fontSize: 12,
              }
          },
          xAxes: {

              ticks:{
                  color: 'white',
                  fontSize: 12,
              }
          },
      },
      plugins: {
        legend: {
          labels: {
            color: 'white',
            display:'false'
          }
        },
      }
      
      }
    
    }
    height={80}
    />
  ) : null;

  //the same thing as before
  //when it initially loads data wont be loaded at first
  //so when the daily data is available we return the line chart else we return null
  //We count have used if
  //doest load the chart if the data is not yet fetched

  const lineChart =
    dailyData !== undefined ? (
     
      <Line style={{backgroundColor:"#343A40",height:"20%",padding:"1%"}}
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map((data) => data.confirmed),
              label: "Infected",
              borderColor: "#4F98C3",
              fill: true,
              backgroundColor:"#4F98C3",
              pointRadius:"0",
            
            },
            {
              data: dailyData.map((data) => data.deaths),
              label: "Deaths",
              borderColor: "#DC3545",
              backgroundColor: "#DC3545",
              fill: true,
              pointRadius:"0"
            }
          ]
        }
      }
      options= {{
        scales: {
            yAxes:{
                ticks:{
                    color: 'white',
                    fontSize: 12,
                }
            },
            xAxes: {

                ticks:{
                    color: 'white',
                    fontSize: 12,
                }
            },
        },
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
    }}
    height={80}
      />
    ) : null;

  return (
    <div className="mainchart">{country ? barchart : lineChart}</div>
  );
};
export default MainFirstChart;
