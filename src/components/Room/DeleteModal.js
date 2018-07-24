import React        from 'react';
import Button       from '../../components/UI/Button/Button';

const deletemodal = (props) => {
    return (
        <div className="delete-modal">
            <h1 className="delete-modal__title">{props.title}</h1>
            <p className="delete-modal__msg">{props.message}</p>
            <Button clicked={props.ok} btnType="delete-modal__button delete-modal__button-success">Delete</Button>
            <Button clicked={props.cancel} btnType="delete-modal__button delete-modal__button-cancel">Cancel</Button>
        </div>
    );
}                                                                                           

export default deletemodal;