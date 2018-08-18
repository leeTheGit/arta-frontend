import React, { Component } from 'react';
import {Link}               from 'react-router-dom';
import axios                from 'axios';
import Aux                  from '../../hoc/Aux';
import qs                   from 'qs';

class LocationPlants extends Component {

    state = {
        plants: null,

    };

    componentDidMount() {
        console.log('component DID MOUNT!!!', this.props);
        this.fetchLocationPlants(this.props.locationId);
    }

    fetchLocationPlants = (id) => {
        return axios.get('/plant/?location=' + id).then( response => {
            var data = response.data.data;

            if (data) {
                this.setState({
                    plants: data,
                });
            }
        });

    };

    render() {

        if (!this.state.plants) {
            return null;
        }

        const plants = this.state.plants.map((plant, i) => {
            return <div><Link to={'/plant/' + plant.id + '/'} onClick={(e)=> e.stopPropagation()}>{plant.serial}</Link></div>
        });

        return (
            <Aux>
                {plants}
            </Aux>
        );
    }
}


export default LocationPlants;