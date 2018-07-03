import React        from 'react';
import Button       from '../../UI/Button/Button';

const controls = (props) => {
    return (
        <div className="user-controls">
            <Button btnType="user-controls__new" clicked={props.newItem}></Button>
        </div>
    )
}

export default controls;