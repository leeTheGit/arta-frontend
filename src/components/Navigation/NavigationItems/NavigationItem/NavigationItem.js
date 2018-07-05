import React from 'react';
import {NavLink} from 'react-router-dom';


const navigationItem = (props) => {
    let list_class = "NavigationItem ";
    let link_class = "NavigationItem__link ";
    
    list_class += (props.klass) ? "NavigationItem--" + props.klass : '';
    link_class += (props.link_class) ? "NavigationItem__link--" + props.link_class : '';

    return (
        
        <li className={list_class}>
            <NavLink to={props.link}
                className={link_class}
                exact={props.exact}
                activeClassName="active">
                {props.children}
            </NavLink>
        </li>
    )
}

export default navigationItem;