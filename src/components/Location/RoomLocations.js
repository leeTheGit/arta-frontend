import React, {Component}   from 'react';
import LocationPlants       from '../Plant/LocationPlants';
import { withRouter }       from 'react-router-dom';

import {Link}               from 'react-router-dom';
import axios                from 'axios';
import Aux                  from '../../hoc/Aux';
import qs                   from 'qs';


class RoomLocations extends Component {


    state = {
        locations: [],
        selectedLocation    : null,
    };

    componentDidMount() {
        this.fetchRoomLocations(this.props.room);
    }

    fetchRoomLocations = (id, index) => {
        return axios.get('/location/?room='+id).then(response => {

            this.setRoomLocationData(response, index);
        }).catch( response => {
            console.log(response);
        });
    }

    setRoomLocationData = (response, index) => {

        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });

        var data = response.data.data;
        const locIndex = data.findIndex(x => x.id === query.location);
        if (locIndex > -1) {
            this.setState({selectedLocation: locIndex});
        }

        if (data) {
            this.setState({
                locations: data,
                selectedLocation: locIndex,
                showData: false
            });
    
                if (!query.locations) {
                query.locations = true;
            }
            this.props.history.push({
                search: qs.stringify(query)
            });
        }
    }

    selectLocation = (selectedLocation) => {
        const locationId = this.state.locations[selectedLocation].id;
        let selectValue = selectedLocation;

        const updateData = {};
        
        if (selectedLocation != this.state.selectedLocation) {
            updateData['selectedLocation'] = selectValue;
        }
        this.setState(updateData);
        
        const query = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true
        });
        query.location = locationId;

        this.props.history.push({
            search: '?' + qs.stringify(query)
        });
    };

    getLocationPlants = (e) => {
        // e.stopPropagation();
        this.setState({
            showLocationPlants: true,
        });
    };




    render() {

        const roomLocations = this.state.locations.map((location, index) => {

            let itemClass = "room-location__item";
            if (this.state.selectedLocation === index) {
                itemClass += " location--selected";
            }
            const linkAddr = "/locations?room=" + location.room_id;
            return (
                <li onClick={(e) => {e.stopPropagation(); this.selectLocation(index)}} key={location.id} className={itemClass}>
                    <Link to={linkAddr} onClick={(e)=> e.stopPropagation()}>
                        <p className="room-location__p" id={location.id}>{location.name}</p>
                    </Link>
                    <button onClick={(e) => this.getLocationPlants(e)}>Plants</button>

                    {this.state.showLocationPlants && this.state.selectedLocation === index && <LocationPlants locationId={location.id}/>}
                </li>
            )
        });

        return <ul className="room-location">{roomLocations}</ul>;
    }
}

export default withRouter( RoomLocations );