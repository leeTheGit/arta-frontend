import React, {Component}   from 'react';
import UserControls         from '../components/User/Usercontrols/Usercontrols';
import Location             from '../components/Location/Location';
import RoomNav              from '../components/Location/Roomnav';
import axios                from 'axios';
import qs                   from 'qs';
import {
    SortableContainer, 
    arrayMove
} from 'react-sortable-hoc';



// const DragHandle = SortableHandle(() => <span className="location__handle">::</span>);

// const SortableItem = SortableElement( ( {value, click, rooms, roomSelect, locationId} ) =>
//     <li className="location">
//         <DragHandle />
//         <p className="location__p" id={value.id} onClick={()=> click(value.id)}>{value.name}</p>
//         <select className="single-plant__locations" value={value.room_id || 0} onChange={(e) => roomSelect(e, locationId)}>
//             {rooms}
//         </select>
//         {/* <p className="" id={value.id}>{value.id}</p>
//         <p className="" id={value.id}>{value.room_id}</p> */}

//         {/* <Button btnType="location__delete" clicked={(e) => props.delete(props.userid, props.firstname)}></Button> */}

//     </li>
// );

const SortableList = SortableContainer(({items, clicked, rooms, roomSelect}) => {

    return (
        <ul>
        {items.map((value, index) => (
            <Location   key={`item-${index}`} 
                        click={clicked} 
                        roomSelect={roomSelect} 
                        index={index} 
                        rooms={rooms} 
                        value={value}
                        locationId={value.id} />
        ))}
        </ul>
    );
});



class Locations extends Component {

    state = {
        locations: [],
        rooms: [],
        new : null,
        selectedRoom: 0
    };


    componentDidMount() 
    {
        // axios.all([this.fetchLocations(), this.fetchRooms()])
        // .then(axios.spread( (locations, rooms) => {
        //     console.log(rooms, locations);
        //     this.setState({
        //         rooms: rooms.data.data || [],
        //         locations: locations.data.data || []
        //     });
        // }));

        this.fetchRooms().then(roomResponse => {

            this.setState({rooms: roomResponse.data.data || []}, () => {

                this.fetchLocations().then( locResponse => {

                    this.setState({
                        locations: locResponse.data.data || []
                    });
                });
            });

        })
    }

    onSortEnd = ({oldIndex, newIndex}) => {

        if (oldIndex === newIndex) {
            return;
        }

        const {locations} = this.state;

        const locationId = this.state.locations[oldIndex].id;

        axios.put('/location/' + locationId, qs.stringify( {'rank': newIndex + 1, 'old_rank': oldIndex + 1} ) )
            .then(() => {
                this.fetchLocations().then( (locations) => {

                    this.setState({
                        locations: locations.data.data || []
                    });
                });        
            });

        this.setState({
            locations: arrayMove(locations, oldIndex, newIndex),
        });
    };
    

    fetchLocations = () => {
        const room = this.state.rooms[this.state.selectedRoom];
        const roomid = room.id
        return axios.get('/location?room=' + roomid);
    }

    fetchRooms = () => {
        return axios.get('/room/');
    }

    selectRoom = (e, locationId) => {
        const value = e.target.value;
        axios.put('/location/' + locationId, qs.stringify( {'room_id': value} ) )
        .then( response => {
            if (response.data.data) {
                this.fetchLocations().then( (locations) => {
                    this.setState({
                        locations: locations.data.data || []
                    });
                });        
            }
        }).catch( response => {
            // console.log(response);
        });

        console.log('location selected');
    }

    getId(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
      
    newLocation = (e) => {
        const state = {
            status: 'new',
            id: this.getId(100),
            name: 'New location',
        }
        this.setState({new: state});
    }

    save = (e) => {
        e.preventDefault();
        const newLocation = { ...this.state.new };
        newLocation.room_id = this.state.rooms[this.state.selectedRoom].id;

        axios.post('/location', qs.stringify(newLocation))
            .then( response => {
                this.setState({new: null});
                this.fetchLocations().then( response => {
                    this.setState({
                        locations: response.data.data || []
                    });
                });            
            }).catch( response => {
                console.log(response);
            });
    }


    setName = (e) => {
        const newLocation = {...this.state.new}
        newLocation.name = e.target.value;
        this.setState({new: newLocation})
    }

    delete = (id) => {
        console.log("deleting", id);
    }

    selectRoomLocations = (e, index) => {
        e.preventDefault();
        this.setState({selectedRoom: index}, () => {
            this.fetchLocations().then( (locations) => {
                this.setState({
                    locations: locations.data.data || []
                });
            });      
        });
    }

    render() {

        if (!this.state.locations) {
            return <p>There are no locations!!</p>
        }

        const rooms = this.state.rooms.map((room) => {
            return <option key={room.id} value={room.id}> {room.name}</option>
        });



        let newLocation = null;

        if (this.state.new) {
            newLocation = (
                <li className="location__new" key={this.state.new.id}>
                    <input id={this.state.new.id} value={this.state.new.name} 
                        onChange={(e) => {this.setName(e)}} /> 
                    <button onClick={this.save}>Save</button>
                </li>
            )
        }
        
        const locations = <SortableList items           = {this.state.locations} 
                                        rooms           = {rooms}
                                        clicked         = {this.delete}
                                        onSortEnd       = {this.onSortEnd} 
                                        roomSelect      = {this.selectRoom}
                                        useDragHandle   = {true} 
                                        />
        
        return (
            
            <div>
                <UserControls newItem={this.newLocation}/>
                <RoomNav rooms={this.state.rooms} select={(e, index) => this.selectRoomLocations(e, index)} selected={this.state.selectedRoom} />
                <div className="u-margin-top-60">
                    {newLocation}
                    {locations}
                </div>
            </div>
        );
    }
}

export default Locations;