import React            from 'react';

import NavigationItems  from '../NavigationItems/NavigationItems';
import DrawerToggle     from '../SideDrawer/DrawerToggle/DrawerToggle';
import Separator        from '../../UI/Separator/Separator';
import Aux              from '../../../hoc/Aux';


const toolbar = (props) => (
    <Aux>
        <header className="Toolbar">
            <DrawerToggle click={props.click}/>
            <nav className="Toolbar-desktopOnly">
                <NavigationItems isLoggedIn={props.isLoggedIn} username={props.username}/>
            </nav>
        </header>
        <Separator type="header"/>
    </Aux>
);

export default toolbar;