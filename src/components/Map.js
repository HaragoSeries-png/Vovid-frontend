import React, { useEffect, useState } from "react";
import TH from "@svg-maps/thailand";
import USA from "@svg-maps/usa";
import { SVGMap, CheckboxSVGMap } from "react-svg-map";
import "../css/mapSize.css";
import ReactDOM from "react-dom";
import "react-svg-map/lib/index.css";
import { Grid } from "@material-ui/core";
import "../css/mainpage.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMap from "highcharts/modules/map";
import mapDataIE from "@highcharts/map-collection/countries/th/th-all.geo.json";
import { fetchCluster } from "../api/apiCluster";
import loadingIcon from "../img/icon/loading.svg"
highchartsMap(Highcharts);
const Map = ({selectProvince,setselectProvince,selectedCases}) => {
  var topology;
  var api;
  const [isLoading, setisLoading] = useState(false)
  var testObj
  var dataCluster;
  var clusterNum;
  const [focusedLocation, setFocusedLocation] = useState(null);
  const [realProvinceData, setrealProvinceData] = useState(null);
  var selectedData
  let provinceStorage = []
  var contain;
  var isSuc = false;
  var oldData = "";
  
  //click locate and change state
  function selectFunction(name,cluster){
    
    provinceStorage[0] = name;
    provinceStorage[1] = cluster


    
      setTimeout(() => {
        setselectProvince(provinceStorage)
        oldData = selectProvince[0];

        if(oldData === name){
          setselectProvince(["-","-"])
        }
      }, 10);





  }

  function handleDataAPI(){
    selectedData = selectedCases.filter((value)=>{
      return value.selected === true
    })


    
  }
  useEffect(async () => {
  setisLoading(true)
  handleDataAPI()
  
  api = await fetchCluster(selectedData[0].api);
  dataCluster = api.data.dataProvince;
  setrealProvinceData(dataCluster)
  selectFunction("-","-")
  
  
  setisLoading(false)
    

  }, [selectedCases]);
  
  

  
  const mapOptions = {
    chart: {
      map: "countries/th/th-all",
      backgroundColor: "#343A40",
      height:"600px",
      expandSteps : 10,
      expandDuration : 600,
      events:{
        load:function(){
          this.mapZoom(5)
        }
      }
    },
    title: {
      text: "Thailand Map",
      color:"white",
      fill:"white",
      y:25,
    },
    
    credits: {
      enabled: false,
    },
    mapNavigation: {
      enabled: true,
      mouseWheelSensitivity: 1.5,
      buttons:{
        zoomIn:{
          x:150
        },
        zoomOut:{
          x:150
        }
      },
      buttonOptions: {
        theme: {
          r: 5
        },
        verticalAlign: "bottom",
       
      },
      backgroundColor: "#ececec",
    },

    colorAxis: {
      min: 1,
      max:4,
      minColor: "#238823",
      maxColor: "#FF4500",
    },
    
    tooltip: {
      headerFormat: "",
      pointFormat: "<b>{point.freq}</b><br><b>{point.name}</b> ",
      
    },
    series: [
      {
        data: realProvinceData,
        name: "High severity",
        mapData: mapDataIE,
        showInLegend: true,
        allowPointSelect: true,
        cursor:'pointer',

        states: {
          hover: {
            color: "#FFDE02",
          },
          select: {
            color: 'orange'
      }
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
        color:"red",
        fill:"red",
      },
      {
        data:dataCluster,
        name:"Low severity",
        showInLegend:true,
        color:"green",
        fill:"white"
      }
      
    ],
    legend: {
      itemStyle: {
          color: 'white'
      }  
  },
    plotOptions: {
      series: {
        point: {
          events: {
            click: function () {
              selectFunction(this.name,this.value)
            },
          },
        },
      },
      
    },
  };

  const ThMap = () =>(
    <div>
          <div>
            <HighchartsReact
              constructorType={"mapChart"}
              highcharts={Highcharts}
              options={mapOptions}
              style={{ fill: "#343A40",padding:"30px",height:"600px"}}
            />
          </div>
    </div>
  );

  
  if (isLoading === true) {
    return (
      <div>
      <div  style={{width:"100%",height:"600px",backgroundColor:"#343A40"}} >
      <img
        src={loadingIcon}
        width="60px"
        style={{
          paddingTop: "0px",
          marginLeft: "auto",
          marginRight: "auto",
          width:"200px",
          paddingTop:"11%"
        }}
      />
      </div>
      <div style={{fontSize:"20px",color:"white",textAlign:"center",marginTop:"-310px"}}>
        Loading. . . 
      </div>
    </div>
    )
  }else{
    return <div> <ThMap/> </div>;
  }
  
};

export default Map;
// const MapTest = (props) =>{

//   return(
//     <div>
//     <HighchartsReact
//       constructorType={"mapChart"}
//       highcharts={Highcharts}
//       options={props.mapOptions}
//       style={{ fill: "#343A40",padding:"30px",height:"600px"}}
//     />
//   </div>
//   )
// }