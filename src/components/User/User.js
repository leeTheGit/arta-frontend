import React from 'react';
import classes from './User.css';
import Button from '../UI/Button/Button';

const user = (props) => {
    return (
        <div className={classes.User}>
            <Button btnType="user__delete" clicked={(e) => props.delete(props.userid, props.firstname)} >X</Button>

            <div className={classes.user__inputgroup}>
                <label className={classes.user__label}>Firstname:</label>
                <input className={classes.user__input} type="text" name="firstname" value={props.firstname} />
            </div>


            <div className={classes.user__inputgroup}>
                <label className={classes.user__label}>Lastname:</label>
                <input className={classes.user__input} type="text" name="lastname" value={props.lastname} />
            </div>


            <div className={classes.user__inputgroup}>
                <label className={classes.user__label}>Username:</label>
                <input className={classes.user__input} type="text" name="username" value={props.username} />
            </div>


            <div className={classes.user__inputgroup}>
                <label className={classes.user__label}>Email:</label>
                <input className={classes.user__input} type="text" name="email" value={props.email} />
            </div>

            <div className={classes.user__inputgroup}>
                <label className={classes.user__label}>Group:</label>
                <input className={classes.user__input} type="text" name="group" value={props.group} />
            </div>
        </div>
    )
}

export default user;