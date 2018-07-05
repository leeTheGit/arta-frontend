import React from 'react';

const plantdataSave = (props) => {
    
    let rootClasses = ["single-plant__data"];
    rootClasses.push("single-plant__data-" + props.customClass);

    let h3Class = ["single-plant__data-label"];
    h3Class.push("single-plant__data-label-" + props.customClass);

    return (
        <div className={rootClasses.join(" ")} onClick={ e => props.click(e) }>
            <h3 className={h3Class.join(" ")}>{props.label}</h3>
        </div>
    );

}


export default plantdataSave;