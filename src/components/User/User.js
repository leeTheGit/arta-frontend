import React from 'react';
import classes from './User.css';
import Button from '../UI/Button/Button';

const user = (props) => {
    return (
        <div className={classes.User}>
            <Button clicked={props.delete}>X</Button>
            <p>{props.firstname} {props.lastname}</p>
            <p>{props.username}</p>
        </div>
    )
}

export default user;