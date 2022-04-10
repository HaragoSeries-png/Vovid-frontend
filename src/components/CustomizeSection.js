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
  setoptionSelect
}) {
  const axisxType = ["Location", "Date"];
  const axisyType = ["New cases", "Total cases", "New deaths", "Total deaths"];
  let x;
  let y;
 
  const changeXaxis = (topic) => {
    const a = topic;
    console.log("x axis : ", a);
    if (a === xAxis) {
      setxAxis("");
    } else {
      setxAxis(topic);
      x = topic;
    }
  };
  const changeYaxis = (topic) => {
    const b = topic;
    console.log("y axis : ", b);
    if (b === yAxis) {
      setyAxis("");
    } else {
      setyAxis(topic);
      y = topic;
    }
  };
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

  useEffect(() => {
    
  }, [optionSelect]);

  if (!multiSelect) {
    return (
      <div className="main-container-visual">
        <div className="header-axis">
          <div>X-Axis</div>
          <div>Y-Axis</div>
        </div>

        <div className="axis-type">
          <div className="axis-list">
            {axisxType.map((item, index) => {
              return (
                <div
                  key={item}
                  className={
                    "bgAxis " + (item === xAxis ? "bgAxis-active" : "")
                  }
                  onClick={() => setxAxis(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>

          <div className="axis-list">
            {axisyType.map((item, index) => {
              return (
                <div
                  key={item}
                  className={
                    "bgAxis " + (item === yAxis ? "bgAxis-active" : "")
                  }
                  onClick={() => setyAxis(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="main-container-visual">
        <div className="header-axis">
          <div>X-Axis</div>
          <div>Y-Axis(multiple)</div>
        </div>

        <div className="axis-type">
          <div className="axis-list">
            {axisxType.map((item, index) => {
              return (
                <div
                  key={item}
                  className={
                    "bgAxis " + (item === xAxis ? "bgAxis-active" : "")
                  }
                  onClick={() => setxAxis(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>

          <div className="axis-list">
            {optionSelect.map((item, index) => {
              return (
                <div
                  key={index}
                  className={
                    "bgAxis " + (item.selected ? "bgAxis-active" : "adasdasdsa")
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
}
