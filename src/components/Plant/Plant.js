import React from 'react';

const Plant = (props) => {
    return (
        <div onClick={ () => props.clicked(props.plantid) } className="plant">
            <div className="plant__img"></div>
            <ul data-id={props.plantid}>
                <li>Created: {props.created}</li>
                <li>Serial: {props.serial}</li>
                <li>Life Cycle: {props.lifecycle}</li>
                <li>Location: {props.location}</li>
            </ul>
        </div>
    )
}

export default Plant;