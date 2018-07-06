import React        from 'react';
import Button       from '../../UI/Button/Button';

const controls = (props) => {
    console.log(props);
    const state_new = (props.adButton) ? true : false;
    const state_update = (props.update) ? true : false;


    let addClass = "user-controls__button user-controls__button--new";
    addClass += (state_new) ? " deactive" : "";
    
    let xClass = "user-controls__button user-controls__button--delete";
    xClass += (state_new || state_update) ? "" : " deactive";

    let updateClass = "user-controls__button user-controls__button--update";
    updateClass += (state_new) ? " deactive" : "";
    updateClass += (state_update) ? "" : " deactive";

    const cancelFunc = props.cancel;

    return (
        <div className="user-controls" onClick={(e) => props.click(e)}>
            <Button btnType={addClass} clicked={props.newItem}></Button>
            <Button btnType={updateClass} clicked={props.editItem}></Button>
            <Button btnType={xClass} clicked={cancelFunc}></Button>
            <div className="u-clear-both"></div>
        </div>
    )
}

export default controls;