import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {

    const username = props.username ? props.username : "" ;

    return (
        <ul className="NavigationItems">
            <NavigationItem link="/" exact>Home</NavigationItem>
            <NavigationItem link="/plants" exact>Plants</NavigationItem>
            <NavigationItem link="/user">Users</NavigationItem>
            <NavigationItem link="/rooms">Rooms</NavigationItem>
            <NavigationItem link="/locations">Locations</NavigationItem>
            {props.isLoggedIn && <NavigationItem klass="auth" link_class="auth" link="/logout">Logout {username}</NavigationItem>}
        </ul>
    )
};

export default navigationItems;