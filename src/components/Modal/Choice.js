import React        from 'react';
import Button       from '../UI/Button/Button';

const choicemodal = (props) => {
    return (
        <div className="choice-modal">
            <h1 className="choice-modal__title">{props.title}</h1>
            <p className="choice-modal__message">{props.message}</p>
            <Button clicked={props.ok} btnType="choice-modal__button choice-modal__button-success">OK</Button>
            <Button clicked={props.cancel} btnType="choice-modal__button choice-modal__button-cancel">Cancel</Button>
        </div>
    );
}                                                                                           

export default choicemodal;