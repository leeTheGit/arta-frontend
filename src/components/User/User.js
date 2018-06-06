import React from 'react';
import Button from '../UI/Button/Button';
import "../../assets/styles/concat.min.css";

const user = (props) => {
    return (
        <div className="user u-margin-top-40">
            <Button btnType="user__delete" clicked={(e) => props.delete(props.userid, props.firstname)}></Button>

            <div className="user__inputgroup">
                <label className="user__label">Firstname</label>
                <input className="user__input" type="text" name="firstname" value={props.firstname} />
            </div>


            <div className="user__inputgroup">
                <label className="user__label">Lastname</label>
                <input className="user__input" type="text" name="lastname" value={props.lastname} />
            </div>


            <div className="user__inputgroup">
                <label className="user__label">Username</label>
                <input className="user__input" type="text" name="username" value={props.username} />
            </div>


            <div className="user__inputgroup">
                <label className="user__label">Email</label>
                <input className="user__input" type="text" name="email" value={props.email} />
            </div>

            <div className="user__inputgroup">
                <label className="user__label">Group</label>
                <input className="user__input" type="text" name="group" value={props.group} />
            </div>
        </div>
    )
}

export default user;