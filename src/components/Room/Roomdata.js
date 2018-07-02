import React        from 'react';

const roomdata = (props) => {
    return (
        <li className="room-data__item">
            <p className="room-data__p">{props.date}</p>
            <p className="room-data__p">{props.temperature}</p>
            <p className="room-data__p">{props.humidity}</p>
        </li>
    );
}                                                                                           

export default roomdata;