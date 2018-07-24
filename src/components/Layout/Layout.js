import React, { Component } from 'react';
import SideDrawer           from '../Navigation/SideDrawer/SideDrawer';
import { connect }          from 'react-redux';
import Toolbar              from '../Navigation/Toolbar/Toolbar';
import Aux                  from '../../hoc/Aux';


class Layout extends Component {
    
    state = {
        drawerOpen: false,
        isLoggedIn: false,
        authUser: null
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
            });
        });
    }


    render () {
        console.log(this.props.authUser);
        const username = this.props.authUser ? this.props.authUser.firstname : '';
        return (
            <Aux>
                <Toolbar 
                    click={this.openDrawerHandler} 
                    isLoggedIn={this.props.isLoggedIn}
                    username={username} 
                />
                {/* <SideDrawer show={this.state.drawerOpen} click={this.closeDrawerHandler}/> */}

                <main className="">
                    {this.renderChildren(this.props)}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        authUser: state.authUser
    };
}

export default connect(mapStateToProps)(Layout);