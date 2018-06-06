import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle click={props.click}/>
        <nav className="Toolbar-desktopOnly">
            <NavigationItems isLoggedIn={props.isLoggedIn} />
        </nav>
        
    </header>
);

export default toolbar;