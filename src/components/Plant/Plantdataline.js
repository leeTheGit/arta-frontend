import React from 'react';

const plantdataline = (props) => {
    

    let pClass = ["plant-data-line__data-point"];
    pClass.push("" + props.customClass);

    return  <li className={pClass.join(" ")} onClick={props.click}>{props.data}</li>;

}


export default plantdataline;