import React from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle click={props.click}/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
        
    </header>
);

export default toolbar;