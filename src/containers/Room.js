import React, {Component}   from 'react';
import RoomLocations        from '../components/Location/RoomLocations';
import MessageModal         from '../components/Room/MessageModal';
import DeleteModal          from '../components/Room/DeleteModal';
import RoomData             from '../components/Room/RoomData';
import Controls             from '../components/Controls/Controls';
import Newroom              from '../components/Room/Newroom.js';
import moment               from 'moment';
import axios                from 'axios';
import Modal                from '../components/UI/Modal/Modal';
import Room                 from '../components/Room/Room.js';
import Aux                  from '../hoc/Aux';
import qs                   from 'qs';
// import {Link}               from 'react-router-dom';
// import LocationPlants       from '../components/Plant/LocationPlants';


class Rooms extends Component {

    state = {
        new                 : null, // show new room form
        rooms               : null,
        showData            : false,
        deleteModal         : false,
        messageModal        : false,
        selectedRoom        : null,
        showLocations       : false,
        showLocationPlants  : false,
    };

    fetch = url => {return axios.get(url)};

    componentDidMount() {
        this.fetchRooms();
    }


    fetchRooms = () => {
        this.fetch('/room/')
        .then( response => {
            var data = response.data.data;
            
            const query = qs.parse(this.props.location.search, {
                ignoreQueryPrefix: true
            });

            if (data) {
                const update = {rooms: data};

                if (query.room) {

                    const index = data.findIndex(x => x.id === query.room);
                    if (index > -1) {

                        update['selectedRoom'] = index;
                            
                        if (query.locations && query.locations == 'true') {
                            update['showLocations'] = true;
                        }
                    }
                }

                this.setState(update);
            }
        }).catch( response => {
            console.log(response);
        });
    }



    showLocations = (id, index) => {
        if (this.state.selectedRoom === index && this.state.showLocations === true ) {
            this.setState({showLocations: false});
            return;
        }
        this.setState({
            showLocations: true,
            showData: false,
        });
    }

    showRoomData = (id, index) => {
        if (this.state.selectedRoom === index && this.state.showData === true ) {
            this.setState({showData: false});
            return;
        }
        this.setState({
            showLocations: false,
            showData: true,
        });
    };



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
        this.setState({ 
            rooms: rooms, 
            new: true,
            selectedRoom: 0
        });
    };


    selectRoom = (e, selectedRoom) => {

        if (selectedRoom != this.state.selectedRoom) {
            this.setState({'selectedRoom': selectedRoom});
        } 
        // else {
        //     this.setState({'selectedRoom': null});
        // }

        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });

        delete query.room;
        delete query.locations;
        delete query.location;
        query.room = this.state.rooms[selectedRoom].id;

        this.props.history.push({
            search: '?' + qs.stringify(query)
        });
    };




    deleteRoom = () => {
        const selected = this.state.selectedRoom;
        const roomid = this.state.rooms[selected].id;

        axios.delete('/room/' + roomid)
            .then( response => {
                this.setState({new: null});
                this.setState({"deleteModal" : false, selectedRoom: null });
                this.fetchRooms();            
            }).catch( response => {
                console.log(response);
            });
    };

    removeNewRoom = () => {
        let rooms  = [...this.state.rooms];
        rooms.splice(0,1);
        this.setState({rooms, selectedRoom: null, new: null});
    };

    showDeleteModal = () => {

        const room = this.state.rooms[this.state.selectedRoom];
        
        this.fetch('/location/?room='+room.id).then(response => {

            if (response.data.data.length > 0) {
                this.setState({"messageModal" : true });
            } else {
                this.setState({"deleteModal" : true });
            }
        });
    };

    removeModal = () => {
        this.setState({
            "deleteModal" : false,
            "messageModal" : false
         });
    };
    removeDeleteModal = () => {
        this.setState({"deleteModal" : false });
    };




    renderRoomLocations = (index) => {
        if (this.state.showLocations && index === this.state.selectedRoom) {
            const roomid = this.state.rooms[this.state.selectedRoom].id;
            return <RoomLocations room={roomid} />
        }

        return null;
    }

    renderRoomData = (index) => {
        
        if (this.state.showData && index === this.state.selectedRoom ) {
            const roomid = this.state.rooms[this.state.selectedRoom].id;
            return <RoomData room={roomid} />
        }
        return null;
    }
    





    render() {


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
        let rooms = null;
        if (this.state.rooms) {

            rooms = this.state.rooms.map((room,index) => {
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



                        {this.renderRoomLocations(index)}
                        {this.renderRoomData(index)}
                    </Aux>
                )
            });
        }



        const controlCancelFunction = this.state.new ? this.removeNewRoom: this.showDeleteModal;

        return (
            <div>
                <Controls 
                    newItem  = {this.newRoom} 
                    editItem = {this.editData}
                    cancel   = {controlCancelFunction} 
                    adButton = {this.state.new}
                    update   = {this.state.selectedRoom != null || '' }
                    click    = {() => {}}
                />
                {deleteModal}
                {messageModal}

                <div className="u-margin-top-60">
                    {newRoom}
                    <ul>
                        {this.state.rooms && rooms}
                    </ul>
                </div>
            </div>
        );    
    }
}

export default Rooms;