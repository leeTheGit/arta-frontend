import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {



    return (
        <ul className="NavigationItems">
            <NavigationItem link="/" exact>Home</NavigationItem>
            <NavigationItem link="/plants" exact>Plants</NavigationItem>
            <NavigationItem link="/users">Users</NavigationItem>
            <NavigationItem link="/rooms">Rooms</NavigationItem>
            <NavigationItem link="/locations">Locations</NavigationItem>
            {props.isLoggedIn 
                ? <NavigationItem klass="auth" link="/logout">Logout</NavigationItem>
                : <NavigationItem klass="auth" link="/login">Login</NavigationItem>
            }
        </ul>
    )
};

export default navigationItems;