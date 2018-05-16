import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/plants" exact>Plants</NavigationItem>
        <NavigationItem link="/users">Users</NavigationItem>

    </ul>
);

export default navigationItems;