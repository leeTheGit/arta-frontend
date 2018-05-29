import React, { Component } from 'react';
import SideDrawer           from '../Navigation/SideDrawer/SideDrawer';
import { connect }          from 'react-redux';
import Toolbar              from '../Navigation/Toolbar/Toolbar';
import classes              from './Layout.css';
import Aux                  from '../../hoc/Aux';


class Layout extends Component {
    
    state = {
        drawerOpen: false,
        isLoggedIn: false
    };


    closeDrawerHandler = () => {
        this.setState({drawerOpen: false});
    }
    
    openDrawerHandler = () => {
        this.setState({drawerOpen: true});
    }

    renderChildren(props) {
        return React.Children.map(props.children, child => {
            return React.cloneElement(child, {
                isLoggedIn: this.props.isLoggedIn
                // login: this.loginHandler
            });
        });
    }


    render () {
        return (
            <Aux>
                <Toolbar 
                    click={this.openDrawerHandler} 
                    isLoggedIn={this.props.isLoggedIn} />
                {/* <SideDrawer show={this.state.drawerOpen} click={this.closeDrawerHandler}/> */}

                <main className={classes.content}>
                    {this.renderChildren(this.props)}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
    }
}

export default connect(mapStateToProps)(Layout);