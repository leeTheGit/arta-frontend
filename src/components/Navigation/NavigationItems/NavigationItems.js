import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';


const navigationItems = (props) => {



    return (
        <ul className={classes.NavigationItems}>
            {console.log(props.isLoggedIn)}
            <NavigationItem link="/" exact>Home</NavigationItem>
            <NavigationItem link="/plants" exact>Plants</NavigationItem>
            <NavigationItem link="/users">Users</NavigationItem>
            {props.isLoggedIn 
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/login">Login</NavigationItem>
            }
        </ul>
    )
};

export default navigationItems;