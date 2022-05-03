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

highchartsMap(Highcharts);
const Map = ({selectProvince,setselectProvince}) => {
  var topology;
  var api;
  var testObj
  var dataCluster;
  var clusterNum;
  const [focusedLocation, setFocusedLocation] = useState(null);
  const [realProvinceData, setrealProvinceData] = useState(null);
  let provinceStorage = []
  var contain;
  var isSuc = false;
  var dataProvince = [
    ["th-kr", 10], //กระบี่
    ["th-bm", 10], //กรุงเทพมหานคร
    ["th-kn", 0], //กาญจนบุรี
    ["th-kl", 10], //กาฬสินธุ์
    ["th-kp", 10], //กำแพงเพชร
    ["th-kk", 10], //ขอนแก่น
    ["th-ct", 10], //จันทบุรี
    ["th-cc", 10], //ฉะเชิงเทรา
    ["th-cb", 10], //ชลบุรี
    ["th-cn", 10], //ชัยนาท
    ["th-cy", 0], //ชัยภูมิ
    ["th-cp", 0], //ชุมพร
    ["th-tg",10], //ตรัง
    ["th-tt", 10], //ตราด
    ["th-tk", 0], //ตาก
    ["th-nn", 10], //นครนายก
    ["th-np", 10], //นครปฐม
    ["th-nf", 0], //นครพนม
    ["th-nr", 10], //นครราชสีมา
    ["th-nt", 0], //นครศรีธรรมราช
    ["th-ns", 0], //นครสวรรค์
    ["th-no", 10], //นนทบุรี
    ["th-nw", 0], //นราธิวาส
    ["th-na", 0], //น่าน
    ["th-bk", 0], //บึงกาฬ
    ["th-br", 10], //บุรีรัมย์
    ["th-pt", 10], //ปทุมธานี
    ["th-pk", 0], //ประจวบคีรีขันธ์
    ["th-pb", 0], //ปราจีนบุรี
    ["th-pi", 0], //ปัตตานี
    ["th-pa", 10], //พระนครศรีอยุธยา
    ["th-py", 0], //พะเยา
    ["th-pg", 10], //พังงา
    ["th-pl", 10], //พัทลุง
    ["th-pc", 10], //พิจิตร
    ["th-ps", 10], //พิษณุโลก
    ["th-pu", 0], //ภูเก็ต
    ["th-ms", 0], //มหาสารคาม
    ["th-md", 0], //มุกดาหาร
    ["th-yl", 0], //ยะลา
    ["th-ys", 0], //ยโสธร
    ["th-rn", 0], //ระนอง
    ["th-ry", 0], //ระยอง
    ["th-rt", 0], //ราชบุรี
    ["th-re", 10], //ร้อยเอ็ด
    ["th-lb", 10], //ลพบุรี
    ["th-lg", 0], //ลำปาง
    ["th-ln", 0], //ลำพูน
    ["th-si", 10], //ศรีสะเกษ
    ["th-sn", 0], //สกลนคร
    ["th-sg", 0], //สงขลา
    ["th-sa", 10], //สตูล
    ["th-sp", 10], //สมุทรปราการ
    ["th-sm", 10], //สมุทรสงคราม
    ["th-ss", 10], //สมุทรสาคร
    ["th-sr", 10], //สระบุรี
    ["th-sk", 0], //สระแก้ว
    ["th-sb", 10], //สิงห์บุรี
    ["th-sh", 10], //สุพรรณบุรี
    ["th-st", 10], //สุราษฎร์ธานี
    ["th-su", 0], //สุรินทร์
    ["th-so", 0], //สุโขทัย
    ["th-nk", 0], //หนองคาย
    ["th-nb", 0], //หนองบัวลำภู
    ["th-ac", 0], //อำนาจเจริญ
    ["th-un", 0], //อุดรธานี
    ["th-ud", 0], //อุตรดิตถ์
    ["th-ut", 0], //อุทัยธานี
    ["th-ur", 0], //อุบลราชธานี
    ["th-at", 10], //อ่างทอง
    ["th-cr", 0], //เชียงราย
    ["th-cm", 0], //เชียงใหม่
    ["th-pe", 10], //เพชรบุรี
    ["th-ph", 10], //เพชรบูรณ์
    ["th-le", 0], //เลย
    ["th-pr", 0], //แพร่
    ["th-mh", 0], //แม่ฮ่องสอน
  ];
  
  //click locate and change state
  const selectFunction = (name,cluster) =>{
    provinceStorage[0] = name;
    provinceStorage[1] = cluster
  
    setselectProvince(provinceStorage)
  }
  // testfun
  const testFun = (data) =>{
    console.log(data)
  }

  useEffect(async () => {
  api = await fetchCluster();
  dataCluster = api.data;
  clusterNum = dataCluster.map((v)=>{
    return v.cluster
  })

    for(let i =0;i<dataProvince.length;i++){
    dataProvince[i][1] = clusterNum[i]
    }
    contain = dataProvince
    if(clusterNum !== ""){
      setrealProvinceData(contain)
    }
  }, []);
  
  

  
  const mapOptions = {
    chart: {
      map: "countries/th/th-all",
      backgroundColor: "#343A40",
      height:"600px",
      events:{
        load:function(){
          this.mapZoom(2)
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
      min: 0,
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
        name: "จังหวัดที่มีความเสี่ยงสูง",
        mapData: mapDataIE,
        showInLegend: true,
        states: {
          hover: {
            color: "#FFDE02",
          },
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
        color:"red",
        fill:"red",
      },
      {
        data:dataProvince,
        name:"จังหวัดที่มีความเสี่ยงต่ำ",
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
              // testFun(this)
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

  return <div> <ThMap/> </div>;
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