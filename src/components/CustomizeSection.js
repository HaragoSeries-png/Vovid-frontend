import React, { useState } from "react";
import "../css/customSection.css";
export default function CustomizeSection({xAxis,yAxis,setxAxis,setyAxis}){
    const axisxType =["Location","Date"];
    const axisyType =["New cases","Total cases","New deaths","Total deaths"];
    const changeXaxis=(topic)=>{
      console.log("eieiei");
      const a = topic;
      console.log("location : ",a);
      if(a === xAxis){
        setxAxis("")
      }
      else{
      setxAxis(topic);
      }
    }
    const changeYaxis=(topic)=>{
      const b = topic;
      console.log("change y");
      if(b === yAxis){
        setyAxis("")
      }
      else{
      setyAxis(topic);
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
                  onClick={()=>changeXaxis(item)}
                  
                  >
                  {item}
                </div>
              })}

            </div>

            <div className="axis-list">
              {axisyType.map((item,index)=>{
                return <div key={item} 
                className={ "bgAxis " + (item === yAxis ? "bgAxis-active" : "")}
                onClick={()=>changeYaxis(item)}
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
