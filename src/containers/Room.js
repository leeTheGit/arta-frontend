import React, {Component}   from 'react';
import UserControls         from '../components/User/Usercontrols/Usercontrols';
import axios                from 'axios';
import qs                   from 'qs';
import Aux                  from '../hoc/Aux';


class Rooms extends Component {

    state = {
        rooms: null,
        new: null
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
            console.log(data);
        }).catch( response => {
            // console.log(response);
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


    setName = (e) => {
        const newRoom = {...this.state.new}
        newRoom.name = e.target.value;
        this.setState({new: newRoom})
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

        let newRoom = null;

        if (this.state.new) {
            newRoom = (
                <li className="room__new" key={this.state.new.id}>
                    <input id={this.state.new.id} val={this.state.new.name} 
                        onChange={(e) => {this.setName(e)}} /> 
                    <button onClick={this.save}>Save</button>
                </li>
            )
        }


        const rooms = this.state.rooms.map(room => {
            console.log(room.name);
            return (
                <li className="room" key={room.id}>
                    <p className="room__p">{room.name}</p>
                </li>
            )
        });


        return (
            <div>
                <UserControls newItem={this.newLocation}/>
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