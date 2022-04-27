import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Map from "../components/Map";
import TypoMap from "../components/TypoMap";
import "../css/cluster.css";
function ClusterPage() {
  return (
    <div className="containers">
      <Grid container spacing={1}>
        <Grid item xs={9} md={9} style={{marginTop:"2%",marginLeft:"15px"}}>
          <Map style={{borderRadius:"12px"}} />
        </Grid>

        <Grid item xs={2} md={2}>
          <div style={{ marginTop: "5%" }}>
            <div className="layout-customize">
              <div className="box-text">
                <TypoMap />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ClusterPage;
