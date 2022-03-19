import React from 'react'
import "../css/selectGraph.css"
import SubChart from './SubChart'
const SelectGraph = ({graphSelector,setgraphSelector}) => {
     
  const graphData = ["Line","Bar","Pie","Radar","Scatter"]
  function select(types){
    setgraphSelector(types)
  }  
  return (
    <div className='select-container'>
        <div className='chart-type-contain'>
            {graphData.map((graph)=>{
                return(
                    <div 
                    onClick={()=>{select(graph)}}
                    className={
                        "bgType " + (graph === graphSelector ? "bg-active" : "")
                    }
                    >
                        
                        {graph}
                    </div>
                )
            })}
        </div>
        <div>

        </div>
    </div>
  )
}


export default SelectGraph