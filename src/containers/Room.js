import React, {Component}   from 'react';
import axios                from 'axios';

class Rooms extends Component {

    state = {
        rooms: null
    };


    componentWillMount() {
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

    render() {
        if (!this.state.rooms) {
            return <p>There are no rooms!!</p>
        }

        const rooms = this.state.rooms.map(room => {
            console.log(room.name);
            return <p key={room.id}>{room.name}</p>
        })


        return (
            <div>
                {rooms}
            </div>
        );    }
}

export default Rooms;