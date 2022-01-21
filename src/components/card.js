import React from 'react'

const Cuscard = (props) => {
    console.log("card props : ",props);
    return (
        <div style={{backgroundColor: "#ececec"}}>
           {props.nameFood}
        </div>
    )
}

export default Cuscard
