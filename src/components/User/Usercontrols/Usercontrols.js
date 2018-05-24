import React        from 'react';
import classes      from './Usercontrols.css';
import Button       from '../../UI/Button/Button';

const usercontrols = (props) => {


    return (
        <div className={classes.Usercontrols}>
            <Button clicked={props.newUser}>New</Button>
            <form className={classes.SearchForm}>
                <label>Search</label>
                <input type="text" onChange={(e) => {props.updateSearch(e.target.value)}} value={props.search}/>
                <Button clicked={props.clearSearch}>X</Button>
            </form>
        </div>
    )
}

export default usercontrols;