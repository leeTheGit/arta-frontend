import React, {Component}       from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect }              from 'react-redux';

class EnsureLoggedInContainer extends Component {

    render() {
        if (this.props.isLoggedIn) {
            return this.props.children;
        } 
        return <Redirect to="/login" />
    }
}
  
function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.isLoggedIn,
    }
}
  
  export default withRouter( connect(mapStateToProps)(EnsureLoggedInContainer) );