import React, {Component}   from 'react';

// import { withRouter }       from 'react-router-dom';

import {Link}               from 'react-router-dom';
import axios                from 'axios';
import Aux                  from '../../hoc/Aux';
import qs                   from 'qs';
import RoomDataItem         from './RoomDataItem';
import moment               from 'moment';



class RoomData extends Component {

    state = {
        data: [],
        roomDataCount: 0,
        room: this.props.room
    };

    componentDidMount() {
        console.log('roomdata mounting');
        this.fetchRoomData(this.props.room).then( response => {
            var data = response.data.data;
            if (data) {
                const roomDataCount = this.state.roomDataCount;
                
                this.setState({
                    data: data,
                    roomDataCount: roomDataCount + data.length
                });
            }
        });
        console.log(' room data mounting');
    }

    fetchRoomData = (id, params) => {
        let qp = qs.parse("?room="+id, {
            ignoreQueryPrefix: true
        });

        if (params && params['limit']) {
            qp['limit'] = params['limit'];
        }
        if (params && params['offset']) {
            qp['offset'] = params['offset'];
        }
        console.log('/roomdata/?' + qs.stringify(qp));
        return axios.get('/roomdata/?' + qs.stringify(qp)).catch( response => {
            console.log(response);
        });
    }

    loadMoreRoomData = () => {
        const id = this.props.room;

        this.fetchRoomData(id, {'offset': this.state.roomDataCount}).then( response => {
            var data = response.data.data;
            
            if (data) {
                
                this.setState({
                    data: [...this.state.data, ...data],
                    roomDataCount: this.state.roomDataCount + data.length
                });
            }
        });
    };

    render () {

        let roomData = this.state.data.map((data, index) => {
            const date = moment(data.time).format('Do MMM');

            return <RoomDataItem key             = {data.id} 
                                  id             = {data.id}  
                                  date           = {date}
                                  temperature    = {data.temperature} 
                                  humidity       = {data.humidity} />
        });

        roomData = (
            <Aux>
                <ul className="room-data">{roomData}</ul>
                <div onClick={this.loadMoreRoomData}>MORE</div>
            </Aux>
        );
    
        return roomData;
    }

}

export default RoomData;