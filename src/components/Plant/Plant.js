import React from 'react';
import classes from './Plant.css';

const Plant = (props) => {
    return (
        <div className={classes.Plant}>
            <ul data-id={props.plantid}>
                <li>Created: {props.created}</li>
                <li>Serial: {props.serial}</li>
                <li>Life Cycle: {props.lifecycle}</li>
            </ul>
        </div>
    )
}

export default Plant;