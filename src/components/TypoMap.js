
import React, { useEffect } from "react";

import { CardContent, Typography, Grid } from "@material-ui/core";
import "../css/typomap.css"
//For applying multiples classe
//Data is the name of the prop object


const TypoMap = ({ selectProvince,setselectedCases,selectedCases }) => {

  useEffect(() => {
  
  
  }, [selectProvince,selectedCases])
  const selectOptionArray = (item) =>{
    
    let temp_state = [...selectedCases];
    let temp_element = { ...temp_state[item] };
    temp_element.selected = !temp_element.selected;
    temp_state[item] = temp_element;

    
    let testAr = temp_state
    testAr.map((value,i)=> {

      if(item === i){
        value.selected = true
      }
      else{
        value.selected = false
      }
    })

    
    setselectedCases(testAr);
  }
  





  return (
    <div style={{overflowX:"none"}}>

      <Grid container spacing={0} style={{justifyContent:"center"}} >

        <Grid item sm={12} md={10} className="type-box-typo" style={{marginTop:"10%"}} >
          <CardContent >
            <Grid container spacing={2} style={{ paddingTop: "0px" }}>
              <Grid item md={3.5}>
              <div style={{}}>   
                {/* <img
                  src={infected}
                  width="60px"      
                  style={{ paddingTop: "0px",marginLeft:"auto",marginRight:"auto" }}
                /> */}
                </div>
              </Grid>
              <Grid item md={8.5}>
                <Typography
                  color="white"
                  gutterBottom
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                Province
                </Typography>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", fontSize: "15px" }}
                >
             {selectProvince[0]}
                </Typography>
                {/* <Typography
                  color="white"
                  gutterBottom
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  Cluster Group
                </Typography>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  
                    
                    {selectProvince[1]}
                    
                  
                </Typography> */}
              </Grid>
            </Grid>
          </CardContent>
        </Grid>

        <Grid item sm={10} md={10} className="type-box" style={{marginTop:"10%"}}>
          <CardContent>
            <Grid container spacing={2} style={{ paddingTop: "0px" }}>
              <Grid item md={3.5}>
                <div style={{}}>   
                {/* <img
                  src={recovery}
                  width="60px"
                  style={{ paddingTop: "0px",marginLeft:"auto",marginRight:"auto" }}
                /> */}
                </div>
      
              </Grid>
              <Grid item md={8.5}>
                <Typography
                  color="white"
                  gutterBottom
                  style={{ textAlign: "left", fontSize: "20px" }}
                >
                  Cluster Group
                </Typography>
                <Typography
                  variant="h5"
                  style={{ textAlign: "left", fontSize: "15px" }}
                >
                  
                    
                    {selectProvince[1]}
                    
                  
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>

        <Grid item sm={10} md={10} className="type-box special-box"  style={{marginTop:"10%"}}>
          <CardContent>
            <Grid container  style={{ paddingTop: "0px",width:"100%" }}>
                <div style={{fontSize:"22px",marginBottom:"10px",marginLeft:"auto",marginRight:"auto"}}>
                  Customize Select
                </div>
                <div className="grid-contain">
                  {selectedCases.map((value,index)=>{
                    return(
                      <div
                      key={index.name}
                      style={{color:"white"}}
                      className={"box-select "+(value.selected === true ? "option-active" : "option-inactive" )}
                      onClick={()=>selectOptionArray(index)}
                      >
                        {value.name}
                      </div>
                    )
                  })}
                </div>
            
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
 
    








    </div>
  );
};

export default TypoMap;
