import React from 'react'
import Thailand from "@svg-maps/thailand"
import { SVGMap,CheckboxSVGMap } from "react-svg-map";
import '../css/mapSize.css'
import ReactDOM from "react-dom";
import "react-svg-map/lib/index.css";
export const Map = () => {
    return (
        <div className='size '>
            <CheckboxSVGMap 
            onLocationFocus={(value) => console.log(value)}
            map={Thailand} />
        </div>
    )
}

