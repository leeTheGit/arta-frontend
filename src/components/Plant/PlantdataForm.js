import React from 'react';

const plantdataForm = (props) => {
    console.log(props);
    let rootClasses = ["single-plant__data"];
    rootClasses.push("single-plant__data-" + props.customClass);

    let h3Class = ["single-plant__data-label"];
    h3Class.push("single-plant__data-label-" + props.customClass);

    let pClass = ["single-plant__data-point"];
    pClass.push("single-plant__data-point-" + props.customClass);

    const stateKey = props.label.toLowerCase().replace(' ', '_');
    return (
        <div className={rootClasses.join(" ")}>
            <h3 className={h3Class.join(" ")}>{props.label}</h3>
            <input type="text" className={pClass.join(" ")} value={props.data} onChange={ e => {
                const data = {};
                data[stateKey] = e.target.value;
                props.change( data )
                }}></input>
        </div>
    );

}


export default plantdataForm;