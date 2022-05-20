import React, { useEffect, useState } from "react";
import "../css/customSection.css";
export default function CustomizeSection({
  xAxis,
  yAxis,
  setxAxis,
  setyAxis,
  multiSelect,
  setmultiSelect,
  optionSelect,
  setoptionSelect,
  currentChart,
  optionSelectx,
  setoptionSelectx
}) {
  const addOptionArray = (index) => {
    let temp_state = [...optionSelect];
    // 2. Make a shallow copy of the element you want to mutate
    let temp_element = { ...temp_state[index] };
    // 3. Update the property you're interested in
    temp_element.selected = !temp_element.selected;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    temp_state[index] = temp_element;
    // 5. Set the state to our new copy
    setoptionSelect(temp_state);
  };

  const addOptionArrayx = (index)=>{
    let temp_state = [...optionSelectx];
    // 2. Make a shallow copy of the element you want to mutate

    let temp_element = { ...temp_state[index] };
    if(temp_element.name ==="Location"){
      let anoter_temp = {...temp_state[index+1]}
      anoter_temp.selected = false;
      temp_state[index+1] = anoter_temp
      setoptionSelectx(temp_state)
    }
    else{
      let anoter_temp = {...temp_state[index-1]}
      anoter_temp.selected = false;
      temp_state[index-1] = anoter_temp
      setoptionSelectx(temp_state)
    }
    // 3. Update the property you're interested in
    temp_element.selected = !temp_element.selected;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    temp_state[index] = temp_element;
    // 5. Set the state to our new copy
    setoptionSelectx(temp_state);
  }

  useEffect(() => {
  

  }, [optionSelect,currentChart,optionSelectx]);

    return (
      <div className="main-container-visual">
        <div className="header-axis">
          <div className="leftBorder">X-Axis</div>
          <div className="leftBorder" style={{paddingTop:"19px"}}>Y-Axis</div>
        </div>

        <div className="axis-type">
          <div className="axis-list">
            {optionSelectx.map((item, index) => {
              return (
                <div
                  key={item.name}
                  className={
                    "bgAxis " + (item.selected === true ? "bgAxis-active" : "")
                  }
                  onClick={() => addOptionArrayx(index)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>

          <div className="axis-list y-area">
            {optionSelect.map((item, index) => {
              return (
                <div
                  key={index.name}
                  className={
                    "bgAxis " + (item.selected ? "bgAxis-active" : "")
                  }
                  onClick={() => addOptionArray(index)}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>






      </div>
    );
  
}
