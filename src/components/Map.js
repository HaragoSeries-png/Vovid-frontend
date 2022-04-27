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

highchartsMap(Highcharts);
const Map = () => {
  var topology;
  const [focusedLocation, setFocusedLocation] = useState(null);
  const getLocationName = (event) => {
    return event.target.attributes.name.value;
  };
  const handleLocationFocus = (event) => {
    const currentLocate = getLocationName(event);

    setFocusedLocation(currentLocate);
    // console.log(focusedLocation);
  };

  useEffect(async () => {
    topology = await fetch(
      "https://code.highcharts.com/mapdata/countries/th/th-all.topo.json"
    ).then((response) => response.json());
    console.log("topology : ", topology);
  }, []);

  const dataProvince = [
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
      minColor: "green",
      maxColor: "red",
    },
    
    tooltip: {
      headerFormat: "",
      pointFormat: "<b>{point.freq}</b><br><b>{point.name}</b> ",
      
    },
    series: [
      {
        data: dataProvince,
        name: "จังหวัดที่มีความเสี่ยงสูง",
        mapData: mapDataIE,
        showInLegend: true,
        states: {
          hover: {
            color: "#BADA55",
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
              alert(this.name);
            },
          },
        },
      },
      
    },
  };

  const thMap = (
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
  // const usMap = (
  //   <div>
  //     <Grid container spacing={1} style={{ marginLeft: "1px" }}>
  //       <Grid
  //         item
  //         xs={8}
  //         className="map-section section"
  //         style={{ padding: "0px" }}
  //       >
  //         <div style={{ backgroundColor: "#343A40" }}>
  //           <SVGMap
  //             style={{ padding: "0px" }}
  //             className="onMap"
  //             onLocationFocus={handleLocationFocus}
  //             map={USA}
  //           />
  //         </div>
  //       </Grid>
  //       <Grid item xs={4} style={{ padding: "3px", paddingTop: "0px" }}>
  //         <div style={{ width: "100%" }}>{focusedLocation}</div>
  //       </Grid>
  //     </Grid>
  //   </div>
  // );
  return <div> {thMap} </div>;
};

export default Map;
