import React, { useState } from "react";
const Swap = ({chosen}) =>{
  if(chosen == "Pie"){
    return (
      <div>
          Pie
      </div>
    )
  }
  else if(chosen =="Bar"){
    return(
      <div>
        Bar
      </div>
    )
  }
}
const MainChart = () => {
  const [currentChart, setcurrentChart] = useState("Bar");

  function changeChart(nameChart) {
    setcurrentChart(nameChart);
  }
  return (
    <div>
      <div className="top-content">
        <button onClick={()=>changeChart("Bar")}>Bar</button>
        <button onClick={()=>changeChart("Pie")}>Pie</button>
      </div>
      <div className="btm-content">
        {/* {currentChart == "Bar" ? <div>Bar</div> :currentChart=="Pie"?<div>Pie</div>:<div>Soon</div>} */}
        <Swap chosen={currentChart} />
      </div>
    </div>
  );
};

export default MainChart;
