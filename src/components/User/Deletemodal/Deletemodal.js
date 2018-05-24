import React        from 'react';
import classes      from './DeleteModal.css';
import Button       from '../../../components/UI/Button/Button';

const deletemodal = (props) => {
    return (
        <div className={classes.DeleteModal}>
            <h1>I am here to delete you, {props.username}!</h1>
            <Button clicked={props.deleteUser} btnType="Success">Delete</Button>
            <Button clicked={props.removeModal} btnType="Danger">Cancel</Button>
        </div>
    );
}                                                                                           

export default deletemodal;