import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state = {
        drawerOpen: false
    };

    closeDrawerHandler = () => {
        this.setState({drawerOpen: false});
    }
    
    openDrawerHandler = () => {
        this.setState({drawerOpen: true});
    }


    render () {
        return (
            <Aux>
                <Toolbar click={this.openDrawerHandler} />
                <SideDrawer show={this.state.drawerOpen} click={this.closeDrawerHandler}/>

                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;