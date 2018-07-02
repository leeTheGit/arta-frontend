import React from 'react';

const roomnav = (props) => {

    const items = props.rooms.map((room, index) => {
        const active = props.selected === index ? "location-room-nav__link-active" : '';
        const classes = `location-room-nav__link ${active}`;
        return (
            <li key={index} className="location-room-nav__item">
                <a className={classes} onClick={(e) => props.select(e, index)} href="">{room.name}</a>
            </li>
        )
    });

    return (
        <div className="location-room-nav"> 
            <ul className="location-room-nav__list">
                {items}
            </ul>
        </div>
    )
}

export default roomnav;