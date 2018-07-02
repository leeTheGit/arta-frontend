import React from 'react';
import Button from '../UI/Button/Button';


const roomForm = (props) => {
    console.log(props.name);
    return (
        <li className="room__new" key={props.id}>
            <input id={props.id} value={props.name} onChange={(e) => {props.setName(e.target.value)}} /> 
            <button onClick={props.save}>Save</button>
            <Button btnType="new-user-form__remove" clicked={props.removeRoomForm}></Button>
        </li>
    )
}

export default roomForm;