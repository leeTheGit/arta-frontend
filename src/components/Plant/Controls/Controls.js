import React        from 'react';
import Button       from '../../UI/Button/Button';

const controls = (props) => {

    let addClass = "user-controls__button user-controls__button--new";
    addClass += (props.adButton) ? " deactive" : "";
    let xClass = "user-controls__button user-controls__button--delete";
    xClass += (props.adButton) ? "" : " deactive";


    return (
        <div className="user-controls">
            <Button btnType={addClass} clicked={props.newItem}></Button>
            <Button btnType={xClass} clicked={props.cancel}></Button>
        </div>
    )
}

export default controls;