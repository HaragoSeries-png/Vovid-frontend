import React, { useEffect, useState } from 'react'
import TH from "@svg-maps/thailand"
import USA from "@svg-maps/usa"
import { SVGMap,CheckboxSVGMap } from "react-svg-map";
import '../css/mapSize.css'
import ReactDOM from "react-dom";
import "react-svg-map/lib/index.css";
import { Grid } from '@material-ui/core';
import "../css/mainpage.css"

const Map = ({country}) => {
const [focusedLocation, setFocusedLocation] = useState(null);
const getLocationName = (event) => {
    return event.target.attributes.name.value;
  };
const handleLocationFocus = (event)=>{
const currentLocate =getLocationName(event)
setFocusedLocation(currentLocate)
// console.log(focusedLocation);
}
const thMap = (
<div>
<Grid container spacing={1} style={{marginLeft:"1px"}}>
  <Grid item xs={8} className="map-section section" style={{padding:"0px"}}>
      <div  style={{backgroundColor:"#343A40"}}>
       <SVGMap  style={{padding:"0px"}}
        className="onMap"
        onLocationFocus={handleLocationFocus}
        map={TH} />
      </div>

  </Grid>
  <Grid item xs={4} style={{padding:"3px",paddingTop:"0px"}}>
 <div style={{width:"100%"}}>
    {focusedLocation}
 </div>
  </Grid>
</Grid>
</div>

    

)
const usMap = (
<div>
<Grid container spacing={1} style={{marginLeft:"1px"}}>
  <Grid item xs={8} className="map-section section" style={{padding:"0px"}}>
      <div  style={{backgroundColor:"#343A40"}}>
       <SVGMap  style={{padding:"0px"}}
        className="onMap"
        onLocationFocus={handleLocationFocus}
        map={USA} />
      </div>

  </Grid>
  <Grid item xs={4} style={{padding:"3px",paddingTop:"0px"}}>
 <div style={{width:"100%"}}>
    {focusedLocation}
 </div>
  </Grid>
</Grid>
</div>
)
return (
    <div>{country==="Thailand"? thMap : usMap}</div>
);
};

export default Map;