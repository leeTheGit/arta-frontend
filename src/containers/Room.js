import React, {Component}   from 'react';
import UserControls         from '../components/User/Usercontrols/Usercontrols';
import Button               from '../components/UI/Button/Button';
import axios                from 'axios';
import Aux                  from '../hoc/Aux';
import qs                   from 'qs';
import Modal                from '../components/UI/Modal/Modal';
import DeleteModal          from '../components/Room/DeleteModal';
import MessageModal         from '../components/Room/MessageModal';
import Roomdata             from '../components/Room/Roomdata';
import moment               from 'moment';

class Rooms extends Component {

    state = {
        rooms           : null,
        roomData        : [],
        roomLocations   : [],
        new             : null,
        selectedRoom    : null,
        showLocations   : false,
        showData        : false,
        deleteModal     : false,
        messageModal    : false,
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
      
    newLocation = (e) => {
        const state = {
            status: 'new',
            id: this.getId(100),
            name: 'New room',
        }
        this.setState({new: state});
    }

    save = (e) => {
        e.preventDefault();
        const newRoom = { ...this.state.new };
        axios.post('/room', qs.stringify(newRoom))
            .then( response => {
                console.log(response);
                this.setState({new: null});
                this.fetchRooms();            
            }).catch( response => {
                console.log(response);
            });
    }


    setName = (name) => {
        const newRoom = {...this.state.new}
        newRoom.name = name;
        this.setState({new: newRoom})
    }

    removeForm= () => {
        this.setState({"new": null});
    }

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


    showDeleteModal = (id, index) => {
        this.setState({selectedRoom: index});
        this.fetchRoomLocations(id, index).then((response) => {
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














    render() {
        if (!this.state.rooms) {
            return (
                <Aux>
                    <UserControls newItem={this.newLocation}/>
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
            deleteModal = <Modal  show={this.state.deleteModal} 
                                remove={this.removeModal}>
                            <DeleteModal 
                                ok={this.deleteRoom} 
                                cancel={this.removeModal}
                                username={this.state.deleteName}
                                />
                        </Modal>
        }



        let newRoom = null;

        if (this.state.new) {
            newRoom = (
                <li className="room__new" key={this.state.new.id}>
                    <input id={this.state.new.id} value={this.state.new.name} 
                        onChange={(e) => {this.setName(e.target.value)}} /> 
                    <button onClick={this.save}>Save</button>
                    <Button btnType="new-user-form__remove" clicked={this.removeForm}></Button>

                </li>
            )
        }

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
                const date = moment(data.created_at).format('Do MMM');

                console.log(data);
                return <Roomdata key            = {data.id} 
                                 id             = {data.id}  
                                 date           = {date}
                                 temperature    = {data.temperature} 
                                 humidity       = {data.humidity} />
            });
        }



        const rooms = this.state.rooms.map((room,index) => {
            return (
                <Aux key={room.id}>
                    <li className="room" key={room.id}>
                        <p className="room__p">{room.name}</p>
                        <div className="room__spacer"></div>
                        <button onClick={() => this.showRoomData(room.id, index)}>Data</button>
                        <button onClick={() => this.showLocations(room.id, index)}>Locations</button>
                        {room.temperature && <div className="room_temp">{room.temperature}</div> }
                        {room.humidity && <div className="room_temp">{room.humidity}</div> }
                        <Button btnType="new-user-form__remove" clicked={() => this.showDeleteModal(room.id, index)}></Button>

                    </li>
                    { this.state.roomLocations && index === this.state.selectedRoom ? <ul className="room-locations">{roomLocations}</ul> : '' }
                    { this.state.roomData && index === this.state.selectedRoom ? <ul className="room-data">{roomData}</ul> : '' }
                </Aux>
            )
        });


        return (
            <div>
                <UserControls newItem={this.newLocation}/>
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