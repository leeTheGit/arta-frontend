import React        from 'react';
import Button       from '../../UI/Button/Button';

const usersearch = (props) => {


    return (
        <form className="user-search-form">
            <label className="user-search-form__label">Search</label>
            <input className="user-search-form__input" type="text" onChange={(e) => {props.updateSearch(e.target.value)}} value={props.search}/>
            <Button btnType="user-search-form__button" clicked={props.clearSearch}></Button>
        </form>
    )
}

export default usersearch;