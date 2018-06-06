import React from 'react';

const plantdata = (props) => {
    
    let rootClasses = ["single-plant__data"];
    rootClasses.push("single-plant__data-" + props.customClass);

    let h3Class = ["single-plant__data-label"];
    h3Class.push("single-plant__data-label-" + props.customClass);

    let pClass = ["single-plant__data-point"];
    pClass.push("single-plant__data-point-" + props.customClass);


    return (
        <div className={rootClasses.join(" ")}>
            <h3 className={h3Class.join(" ")}>{props.label}</h3>
            <p className={pClass.join(" ")}>{props.data}</p>
        </div>
    );

}


export default plantdata;