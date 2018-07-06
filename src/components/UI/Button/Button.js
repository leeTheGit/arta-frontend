import React from 'react';
// import classes from './Button.css';

const button = (props) => (
    <button 
        className={props.btnType}  
        onClick={(e) => props.clicked(e)}>

        {props.children}

    </button>
);

export default button;