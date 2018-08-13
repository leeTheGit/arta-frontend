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
import qs                   from 'qs';
import {Link}               from 'react-router-dom';

class Rooms extends Component {

    state = {
        new             : null, // show new room form
        rooms           : null,
        roomData        : [],
        showData        : false,
        deleteModal     : false,
        messageModal    : false,
        selectedRoom    : null,
        roomLocations   : [],
        showLocations   : false,
        roomDataCount   : 0,
    };


    componentDidMount() {
        this.fetchRooms();
        console.log(this.props.history);
    }

    fetchRooms = () => {
        axios.get('/room/')
        .then( response => {
            var data = response.data.data;
            if (data) {
                this.setState({rooms: data}, () => {

                    const query = qs.parse(this.props.location.search, {
                        ignoreQueryPrefix: true
                    });
                    if (query.room) {

                        const index = response.data.data.findIndex(x => x.id === query.room);
                        if (index > -1) {
                           
                            this.setState({selectedRoom: index}, () => {
                                if (query.locations && query.locations == 'true') {
                                    this.showLocations(query.room, index);
                                }
                            });
                        }
                    }
                });
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
    fetchRoomData = (id, params) => {
        console.log(id);
        let qp = qs.parse("?room="+id, {
            ignoreQueryPrefix: true
        });

        if (params && params['limit']) {
            qp['limit'] = params['limit'];
        }
        if (params && params['offset']) {
            qp['offset'] = params['offset'];
        }

        console.log(qp);
        console.log(qs.stringify(qp));
        return axios.get('/roomdata/?' + qs.stringify(qp)).catch( response => {
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

                const query = qs.parse(this.props.location.search, {
                    ignoreQueryPrefix: true
                });

                if (!query.locations) {
                    query.locations = true;
                }
                this.props.history.push({
                    search: qs.stringify(query)
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
        this.setState({ 
            rooms: rooms, 
            new: true,
            selectedRoom: 0
        });
    };


    selectRoom = (e, selectedRoom) => {
        const roomId = this.state.rooms[selectedRoom].id;
        let selectValue = selectedRoom;

        const updateData = {
            showLocations: false,
            showData: false,
            roomDataCount: 0
        };
        
        if (selectedRoom != this.state.selectedRoom) {
            updateData['selectedRoom'] = selectValue;
        }
        this.setState(updateData);
        this.props.history.push({
            search: '?room=' + roomId
        })
    };


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
    };

    removeNewRoom = () => {
        let rooms  = [...this.state.rooms];
        rooms.splice(0,1);
        this.setState({rooms, selectedRoom: null, new: null});
    };

    showDeleteModal = () => {

        const room = this.state.rooms[this.state.selectedRoom];

        this.fetchRoomLocations(room.id).then((response) => {

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

    showRoomData = (id, index) => {

        if (this.state.selectedRoom === index && this.state.showData === true ) {
            this.setState({
                selectedRoom: null,
                showData: false,
            });
            return;
        }
        this.fetchRoomData(id).then( response => {
            var data = response.data.data;
            if (data) {
                const roomDataCount = this.state.roomDataCount;
                
                this.setState({
                    roomData: data,
                    selectedRoom: index,
                    showData: true,
                    showLocations: false,
                    roomDataCount: roomDataCount + data.length
                });
            }
        });

    };

    loadMoreRoomData = () => {
        const id = this.state.rooms[this.state.selectedRoom].id;
        const roomData = [...this.state.roomData];

        this.fetchRoomData(id, {'offset': this.state.roomDataCount}).then( response => {
            var data = response.data.data;
            
            if (data) {
                const roomData = [...this.state.roomData, ...data];
                const roomDataCount = this.state.roomDataCount;
                
                this.setState({
                    roomData: roomData,
                    roomDataCount: roomDataCount + data.length
                });
            }
        });

    };







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


        let roomLocations = null;
        if (this.state.roomLocations && this.state.showLocations) {
            roomLocations = this.state.roomLocations.map((location, index) => {
                console.log(location);
                const linkAddr = "/locations?room=" + location.room_id;
                return (
                    <Link to={linkAddr}>
                        <li key={location.id} className="room-location__item">
                            <p className="room-location__p" id={location.id}>{location.name}</p>
                        </li>
                    </Link>
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

            roomData = <Aux><ul className="room-data">{roomData}</ul><div onClick={this.loadMoreRoomData}>MORE</div></Aux>;

        }



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



                        { this.state.roomLocations && index === this.state.selectedRoom ? <ul className="room-location">{roomLocations}</ul> : '' }
                        { this.state.roomData && index === this.state.selectedRoom ? roomData : null }
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