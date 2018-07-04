import React from 'react';

const plantdataoptions = (props) => {
    

    let pClass = ["plant-data-line__data-point"];
    pClass.push("" + props.customClass);


    return (
        <li className={pClass.join(" ")}>
            <button className="" onClick={props.updateData}>Update</button>
            <button className="" onClick={props.deleteData}>Delete</button>
        </li>
    );

}


export default plantdataoptions;