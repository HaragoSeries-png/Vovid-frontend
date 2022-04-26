import React from 'react'
import { useSelector } from 'react-redux';
import Map from '../components/Map';
import TypoMap from '../components/TypoMap';
import "../css/cluster.css"
function ClusterPage (){

    return(
        <div className='containers'>
        <div style={{height:"500px" }}>
        <Map />
         </div>       
         <div className='box-text'>
        <TypoMap/>
         </div>
        </div>
    )
}


export default ClusterPage
