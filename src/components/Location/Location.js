import React from 'react';
import {
    SortableElement, 
    SortableHandle
} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <span className="location__handle">::</span>);

const SortableItem = SortableElement( ( {value, click, rooms, roomSelect, locationId} ) =>
    <li className="location">
        <DragHandle />
        <p className="location__p" id={value.id} onClick={()=> click(value.id)}>{value.name}</p>
        <select className="single-plant__locations" value={value.room_id || 0} onChange={(e) => roomSelect(e, locationId)}>
            {rooms}
        </select>
        <p>{value.rank}</p>
        {/* <p className="" id={value.id}>{value.id}</p>
        <p className="" id={value.id}>{value.room_id}</p> */}

        {/* <Button btnType="location__delete" clicked={(e) => props.delete(props.userid, props.firstname)}></Button> */}

    </li>
);


const location = (props) => {
    return (
        <SortableItem  
            index={props.index}
            click={props.click} 
            value={props.value} 
            rooms={props.rooms}
            roomSelect={props.roomSelect}
            locationId={props.locationId}
        
        />
    )
}

export default location;