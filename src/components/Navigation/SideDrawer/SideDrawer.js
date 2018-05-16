import React from 'react';
import classes from './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

    let drawerClasses = [classes.SideDrawer, classes.close];
    if (props.show) {
        drawerClasses = [classes.SideDrawer, classes.open];
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