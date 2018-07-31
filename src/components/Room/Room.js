import React    from 'react';

const room = (props) => {
    
    const classs = props.class ? "room " + props.class : "room";

    return (
        <li className={classs} key={props.id} onClick={(e) => props.select(e, props.index)}>
            <p className="room__p">{props.name}</p>
            <div className="room__spacer"></div>
            <button className="room__button" onClick={() => props.showRoomData(props.id, props.index)}>Data</button>
            <button className="room__button" onClick={() => props.showLocations(props.id, props.index)}>Locations</button>
            {props.temperature && <div className="room_temp">{props.temperature}</div> }
            {props.humidity && <div className="room_temp">{props.humidity}</div> }
        </li>
    )
}

export default room;