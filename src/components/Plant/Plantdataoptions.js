import React from 'react';

const plantdataoptions = (props) => {
    

    let pClass = ["plant-data-line__data-point"];
    pClass.push("" + props.customClass);


    return (
        <li className={pClass.join(" ")}>
            <button className="plant-data-line__button plant-data-line__button--update" onClick={props.updateData}></button>
            <button className="plant-data-line__button plant-data-line__button--delete" onClick={props.deleteData}></button>
        </li>
    );

}


export default plantdataoptions;