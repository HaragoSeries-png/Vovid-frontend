import React from 'react'
import '../css/cardChart.css'
import BarExam from './BarExam'
import LineExam from './LineExam'
import PieExam from './PieExam'

export const Cardchart = (props) => {

    function GraphType(props){
        if(props.name == "Line chart"){
            return (
            <div className='graph-detail'> 
             <LineExam  />
            </div>
            )
        }
        else if(props.name == "Bar chart"){
            return (
                <div className='graph-detail'> 
                 <BarExam  />
                </div>
                )
        }
        else if(props.name =="Pie chart"){
            return (
                <div className='graph-detail'> 
                 <PieExam  />
                </div>
                )
        }
    }



    return (
        <div className='box'>
            <div className='title'>
                Atr name
            </div>
            <div className='graph-name'>
                {props.name}
            <div className='graph-detail'>
                <GraphType name={props.name}/>
            </div>



            </div>
        </div>
    )
}
