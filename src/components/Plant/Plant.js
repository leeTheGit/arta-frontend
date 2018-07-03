import React        from 'react';
import Button       from '../UI/Button/Button';

const Plant = (props) => {
    return (
        <div key={props.plantid} onClick={ () => props.clicked(props.plantid) } className="plant">
            <div className="plant__img"></div>
            <ul data-id={props.plantid}>
                <li>Created: {props.created}</li>
                <li>Serial: {props.serial}</li>
                <li>Life Cycle: {props.lifecycle}</li>
                <li>Location: {props.location}</li>
            </ul>
            <Button btnType="plant__remove" clicked={(e) => props.remove(e, props.plantid, props.index)}></Button>
        </div>
    )
}

export default Plant;