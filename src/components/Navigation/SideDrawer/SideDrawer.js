import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

    let drawerClasses = ["SideDrawer", "close"];
    if (props.show) {
        drawerClasses = ["SideDrawer", "open"];
    }

    return (
        <Aux>
            <Backdrop show={props.show} click={props.click}/>

            <div className={drawerClasses.join(' ')}>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
};


export default sideDrawer;