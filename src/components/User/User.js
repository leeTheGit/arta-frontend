import React from 'react';
import classes from './User.css';

const user = (props) => {
    return (
        <div className={classes.User}>
            <p>{props.firstname} {props.lastname}</p>
            <p>{props.username}</p>
        </div>
    )
}

export default user;