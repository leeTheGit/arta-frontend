import React, {Component}   from 'react';
import MessageModal         from '../components/Room/MessageModal';
import DeleteModal          from '../components/Room/DeleteModal';
import Roomdata             from '../components/Room/Roomdata';
import Controls             from '../components/Controls/Controls';
import Newroom              from '../components/Room/Newroom.js';
// import Button               from '../components/UI/Button/Button';
import moment               from 'moment';
import axios                from 'axios';
import Modal                from '../components/UI/Modal/Modal';
import Room                 from '../components/Room/Room.js';
import Aux                  from '../hoc/Aux';
// import qs                   from 'qs';

class Rooms extends Component {

    state = {
        new             : null,
        rooms           : null,
        roomData        : [],
        showData        : false,
        deleteModal     : false,
        messageModal    : false,
        selectedRoom    : null,
        roomLocations   : [],
        showLocations   : false,
    };


    componentDidMount() {
        this.fetchRooms();
    }

    fetchRooms = () => {
        axios.get('/room/')
        .then( response => {
            var data = response.data.data;
            if (data) {
                this.setState({rooms: data});
            }
        }).catch( response => {
            // console.log(response);
        });
    }

    fetchRoomLocations = (id, index) => {
        return axios.get('/location/?room='+id).catch( response => {
            console.log(response);
        });
    }
    fetchRoomData = (id, index) => {
        return axios.get('/roomdata/?room='+id).catch( response => {
            console.log(response);
        });
    }


    showLocations = (id, index) => {
        if (this.state.selectedRoom === index && this.state.showLocations === true ) {
            this.setState({
                selectedRoom: null,
                showLocations: false,
            });
            return;
        }
        this.fetchRoomLocations(id, index).then( response => {
            var data = response.data.data;
            if (data) {
                this.setState({
                    roomLocations: data,
                    selectedRoom: index,
                    showLocations: true,
                    showData: false
                });
            }
        });
    }

    getId(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
      
    newRoom = (e) => {
        e.stopPropagation();
        const newRoom = {
            id: this.getId(100),
            name: '',
            status: 'new'
        };

        const rooms = [
            newRoom,
            ...this.state.rooms,
        ];
        this.setState({rooms: rooms, new: true});
    }
    selectRoom = (e, selectedRoom) => {
        console.log(selectedRoom);
        let selectValue = selectedRoom;
        if (selectedRoom === this.state.selectedRoom) {
            selectValue = null;
        }
        this.setState({
            selectedRoom: selectValue,
            showLocations: false,
            showData: false
        });
    }

    // save = (e) => {
    //     e.preventDefault();
    //     const newRoom = { ...this.state.new };
    //     axios.post('/room', qs.stringify(newRoom))
    //         .then( response => {
    //             console.log(response);
    //             this.setState({new: null});
    //             this.fetchRooms();            
    //         }).catch( response => {
    //             console.log(response);
    //         });
    // }


    // setName = (name) => {
    //     const newRoom = {...this.state.new}
    //     newRoom.name = name;
    //     this.setState({new: newRoom})
    // }

    // removeForm= () => {
    //     this.setState({"new": null});
    // }

    deleteRoom = () => {
        const selected = this.state.selectedRoom;
        const roomid = this.state.rooms[selected].id;
        axios.delete('/room/' + roomid)
            .then( response => {
                this.setState({new: null});
                this.setState({"deleteModal" : false });
                this.fetchRooms();            
            }).catch( response => {
                console.log(response);
            });
    }


    showDeleteModal = () => {

        const room = this.state.rooms[this.state.selectedRoom];
        console.log(room);

        this.fetchRoomLocations(room.id).then((response) => {
            console.log(response);
            if (response.data.data.length > 0) {
                this.setState({"messageModal" : true });
            } else {
                this.setState({"deleteModal" : true });
            }
        });
    }

    removeModal = () => {
        this.setState({
            "deleteModal" : false,
            "messageModal" : false
         });
    }
    removeDeleteModal = () => {
        this.setState({"deleteModal" : false });
    }

    showRoomData = (id, index) => {
        if (this.state.selectedRoom === index && this.state.showData === true ) {
            this.setState({
                selectedRoom: null,
                showData: false,
            });
            return;
        }
        this.fetchRoomData(id, index).then( response => {
            var data = response.data.data;
            if (data) {
                this.setState({
                    roomData: data,
                    selectedRoom: index,
                    showData: true,
                    showLocations: false
                });
            }
        });

    }



    removeFormHandler = () => {
    }











    render() {
        if (!this.state.rooms) {
            return (
                <Aux>
                    <p>There are no rooms!!</p>
                </Aux>
            )
        }

        
        let messageModal = null;
        if (this.state.messageModal) {
            messageModal = <Modal  show={this.state.messageModal} 
                                remove={this.removeModal}>
                            <MessageModal 
                                cancel={this.removeModal}
                                />
                        </Modal>
        }



        let deleteModal = null;
        if (this.state.deleteModal) {
            const selected = this.state.selectedRoom;
            const name = this.state.rooms[selected].name;
    
            const message = "Are you sure you want to delete " + name;
            deleteModal = <Modal  show={this.state.deleteModal} 
                                remove={this.removeModal}>
                            <DeleteModal 
                                ok={this.deleteRoom} 
                                cancel={this.removeModal}
                                title="Delete"
                                message={message}
                                />
                        </Modal>
        }



        let newRoom = null;

        // if (this.state.new) {
        //     newRoom = (
        //         <li className="room__new" key={this.state.new.id}>
        //             <input id={this.state.new.id} value={this.state.new.name} 
        //                 onChange={(e) => {this.setName(e.target.value)}} /> 
        //             <button onClick={this.save}>Save</button>
        //             <Button btnType="new-user-form__remove" clicked={this.removeForm}></Button>
        //         </li>
        //     )
        // }

        let roomLocations = null;
        if (this.state.roomLocations && this.state.showLocations) {
            roomLocations = this.state.roomLocations.map((location, index) => {
                return (
                    <li key={location.id} className="room-location__item">
                        <p className="room-location__p" id={location.id}>{location.name}</p>
                    </li>
                )
            });
        }




        let roomData = null;
        if (this.state.roomData && this.state.showData) {
            roomData = this.state.roomData.map((data, index) => {
                const date = moment(data.time).format('Do MMM');

                return <Roomdata key            = {data.id} 
                                 id             = {data.id}  
                                 date           = {date}
                                 temperature    = {data.temperature} 
                                 humidity       = {data.humidity} />
            });
        }



        const rooms = this.state.rooms.map((room,index) => {
            const selectedClass = (this.state.selectedRoom === index) ? "room--selected" : "";

            return (
                <Aux key={room.id}>
                    {room.status != 'new' 
                    
                    ?  <Room 
                            id              = {room.id}
                            name            = {room.name}
                            index           = {index}
                            class           = {selectedClass}
                            select          = {this.selectRoom}
                            humidity        = {room.humidity}
                            temperature     = {room.temperature}
                            showRoomData    = {this.showRoomData}
                            showLocations   = {this.showLocations}
                        />

                    : <Newroom 
                        id              = {room.id}
                        name            = {room.name}
                        index           = {index}
                        showDeleteModal = {this.showDeleteModal}
                        fetch           = {this.fetchRooms}
                        />
                    }



                    { this.state.roomLocations && index === this.state.selectedRoom ? <ul className="room-locations">{roomLocations}</ul> : '' }
                    { this.state.roomData && index === this.state.selectedRoom ? <ul className="room-data">{roomData}</ul> : '' }
                </Aux>
            )
        });


        return (
            <div>
                <Controls 
                    newItem  = {this.newRoom} 
                    editItem = {this.editData}
                    cancel   = {this.showDeleteModal} 
                    adButton = {this.state.new}
                    update   = {this.state.selectedRoom != null || '' }
                    click    = {this.removeFormHandler}
                />
                {deleteModal}
                {messageModal}

                <div className="u-margin-top-60">
                    {newRoom}
                    <ul>
                        {rooms}
                    </ul>
                </div>
            </div>
        );    
    }
}

export default Rooms;