import React        from 'react';
import Button       from '../../UI/Button/Button';

const usercontrols = (props) => {


    return (
        <div className="user-controls">
            <Button btnType="user-controls__new" clicked={props.newItem}></Button>
            <form className="user-search-form">
                <label className="user-search-form__label">Search</label>
                <input className="user-search-form__input" type="text" onChange={(e) => {props.updateSearch(e.target.value)}} value={props.search}/>
                <Button btnType="user-search-form__button" clicked={props.clearSearch}></Button>
            </form>
        </div>
    )
}

export default usercontrols;