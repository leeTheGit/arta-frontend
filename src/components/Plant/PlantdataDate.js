import React from 'react';

const plantdataDate = (props) => {
    

    let pClass = ["plant-data-line__data-point"];
    pClass.push("plant-data-line__data-point--timecontainer" + props.customClass);

    return  (
        <li className={pClass.join(" ")} onClick={props.click}>
            <div className="plant-data-line__data-point--time" dateTime={props.date}>
                <p className="plant-data-line__data-point--day" >{props.day}</p>
                <p className="plant-data-line__data-point--month" >{props.month}</p>
            </div>
        </li>
    );

}


export default plantdataDate;