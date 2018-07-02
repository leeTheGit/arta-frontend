import React        from 'react';
import Button       from '../../components/UI/Button/Button';

const deletemodal = (props) => {
    return (
        <div className="delete-modal">
            <h1>Cannot deletel this room as it has locations attached</h1>
            <Button clicked={props.cancel} btnType="delete-modal__button delete-modal__button-cancel">Cancel</Button>
        </div>
    );
}                                                                                           

export default deletemodal;