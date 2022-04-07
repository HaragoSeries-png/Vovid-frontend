import React, { useEffect, useState } from "react";
import "../css/customSection.css";
export default function CustomizeSection({xAxis,yAxis,setxAxis,setyAxis}){
    const axisxType =["Location","Date"];
    const axisyType =["New cases","Total cases","New deaths","Total deaths"];
    let x;
    let y;
    const changeXaxis=(topic)=>{
      const a = topic;
      console.log("x axis : ",a);
      if(a === xAxis){
        setxAxis("")
      }
      else{
      setxAxis(topic);
      x= topic
      }
    }
    const changeYaxis=(topic)=>{
      const b = topic;
      console.log("y axis : ",b);
      if(b === yAxis){
        setyAxis("")
      }
      else{
      setyAxis(topic);
      y=topic
      }
    }

  //   const firstData =[
  //   {
  //     name:1,
  //     dataSet: [10, 10, 10, 10]
  //   },
  //   {
  //     name:2,
  //     dataSet:[33, 53, 85, 41, 44, 65]
  //   },
  //   {
  //     name:3,
  //     dataSet:""
  //   },
  //   {
  //     name:4,
  //     dataSet:""
  //   },
  //   {
  //     name:5,
  //     dataSet:""
  //   },
  //   {
  //     name:6,
  //     dataSet:""
  //   },
  // ]

    return (
      <div className="main-container-visual">
        <div className="header-axis">
        <div>
          X-Axis
        </div>
        <div>
          Y-Axis
        </div>
        </div>


        <div className="axis-type">

            <div className="axis-list">
              {axisxType.map((item,index)=>{
                return <div 
                  key={item}
                  className={ "bgAxis " + (item === xAxis ? "bgAxis-active" : "")}
                  onClick={()=>setxAxis(item)}
                  
                  >
                  {item}
                </div>
              })}

            </div>

            <div className="axis-list">
              {axisyType.map((item,index)=>{
                return <div key={item} 
                className={ "bgAxis " + (item === yAxis ? "bgAxis-active" : "")}
                onClick={()=>setyAxis(item)}
                >
                  {item}
                </div>
              })}

            </div>
        

        </div>



          {/* <div className="displayAxis">
              <div>{xAxis}</div>
              <div>{yAxis}</div>
          </div> */}


        
      </div>
    );

}
