import React, { useState } from "react";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import "../css/selectDate.css"
import { Calendar, utils } from "react-modern-calendar-datepicker";
const SelectDate = ({valueDate,setValueDate}) =>{
  console.log("from component : ",valueDate);
  const [selectedDay, setSelectedDay] = useState(null);
  const useDate = {
    year:2022,
    day:0,
    month:0
  }
  const maxDate = {
    year : 2022,
    day:0,
    month:0
  }




  function checkDate(){
    let fDay;
    let fmonth;
    let mDay;
    let mMonth
    
    mDay = utils().getToday().day;
    mMonth = utils().getToday().month;
    if(mDay - 1 ==0){
      mMonth = mMonth -1;
      if(mMonth == 1 || 3 || 5 || 7 || 8 || 10 || 12){
          mDay = 31
      } 
      else{
        mDay =30
      }
    }else{
      mDay = mDay -1
    }
    maxDate.day = mDay;
    maxDate.month = mMonth;
  


    fDay = utils().getToday().day;
    fmonth = utils().getToday().month;
    if(fDay - 7 <=0){
     fmonth = fmonth - 1;
     if(fmonth == 1 || 3 || 5 || 7 || 8 || 10 || 12){ 
        if(fDay -7  ==0){
          fDay = 31
        }
        else if(fDay -7 == -1){
          fDay = 30
        }
        else if(fDay -7 == -2){
          fDay = 29
        }
        else if(fDay -7 == -3){
          fDay = 28
        }
        else if(fDay -7 ==-4){
          fDay = 27
        }
        else if(fDay -7 ==-5){
          fDay = 26
        }
        else if(fDay -7 ==-6){
          fDay = 25
        }
     }
     //disable febuary month 
     else if(fmonth == 4 || 6 || 9 || 11 ){
        if(fDay - 7 ==0){
          fDay = 30
        }
        else if(fDay - 7 ==-1){
          fDay = 29
        }
        else if(fDay - 7 ==-2){
          fDay = 28
        }
        else if(fDay - 7 ==-3){
          fDay = 27
        }
        else if(fDay - 7 ==-4){
          fDay = 26
        }
        else if(fDay - 7 ==-5){
          fDay = 25
        }
        else if(fDay - 7 ==-6){
          fDay = 24
        }
     }
     useDate.day = fDay;
     useDate.month = fmonth;
    }
    console.log("select day : ",selectedDay);
  }
  function toISOFormat(){
    let day;
    let month;
    let year;
    day = selectedDay.day;
    month = selectedDay.month;
    year = selectedDay.year
  }
  checkDate();

    return (
        <div className='dateContainer'>
      <DatePicker
      value={selectedDay}
      onChange={setSelectedDay}
      inputPlaceholder="Select a day"
      shouldHighlightWeekends
      minimumDate={useDate}
      maximumDate={maxDate}
    
    />
      </div>
    );
}
export default SelectDate

