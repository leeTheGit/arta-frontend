import React from 'react';
import {NavLink} from 'react-router-dom';


const navigationItem = (props) => {
    let klass = "NavigationItem ";
    klass += (props.klass) ? "NavigationItem--" + props.klass : '';
    return (
        
        <li className={klass}>
            <NavLink to={props.link}
                exact={props.exact}
                activeClassName="active">
                {props.children}
            </NavLink>
        </li>
    )
}

export default navigationItem;