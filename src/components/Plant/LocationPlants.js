import React, { Component } from 'react';
import axios                from 'axios';
import qs                   from 'qs';
import Aux                  from '../../hoc/Aux';

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
            console.log(data);
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
            return <div>{i}</div>
        });
        console.log(plants);
        return (
            <Aux>
                {plants}
            </Aux>
        );
    }
}


export default LocationPlants;