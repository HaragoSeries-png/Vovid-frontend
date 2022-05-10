import PropTypes from 'prop-types'
import React, { Component, useEffect } from 'react'
import "../css/selectCountry.css"



const SelectCountry=({country,setcountry}) =>{
    useEffect(() => {
      console.log("country array : ",country)
    }, [country])
  

    function changeCountry(item){
   
      let temp_state = [...country];
      let temp_element = {...temp_state[item]}
      temp_element.selected = !temp_element.selected;
      temp_state[item] = temp_element;
      let storageAr = temp_state
      storageAr.map((value,i)=>{
        if(item === i){
          value.selected = true
        }
        else{
          value.selected = false
        }
      })
      setcountry(storageAr)
    }


    return (
      <div className='selected-container'>
         <div className='header-selected'>
            Select Region
         </div>
         <div className='btn-contain'>
                    {country.map((item,index)=>{
                      return(
                        <div
                        key={index.country}
                        className = {"btn-box-select " + (item.selected===true ? "active-selected" : "" )}
                        onClick= {()=>changeCountry(index)}
                        >
                          {item.country}
                        </div>
                      )
                    })}
         </div>
      </div>
    )
}
export default SelectCountry