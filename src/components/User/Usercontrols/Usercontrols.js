import React from 'react';
import classes from './Usercontrols.css';
import Button from '../../UI/Button/Button';

const usercontrols = (props) => {


    return (
        <div className={classes.Usercontrols}>
            <Button clicked={props.newUser}>New</Button>
        </div>
    )
}

export default usercontrols;