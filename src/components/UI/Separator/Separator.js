import React from 'react';

const separator = (props) => {
    return (
        <div className={"separator separator__" + props.type}></div>
    );
}

export default separator;