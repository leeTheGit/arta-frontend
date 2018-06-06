import React, {Component}   from 'react';
import axios                from 'axios';

class Locations extends Component {

    state = {
        locations: null
    };


    componentWillMount() {
        axios.get('/location/')
        .then( response => {
            var data = response.data.data;
            if (data) {
                this.setState({locations: data});
            }
            console.log(data);
        }).catch( response => {
            // console.log(response);
        });


    }
    render() {

        if (!this.state.locations) {
            return <p>There are no locations!!</p>
        }

        const locations = this.state.locations.map(location => {
            console.log(location.name);
            return <p key={location.id}>{location.name}</p>
        })


        return (
            <div>
                {locations}
            </div>
        );
    }
}

export default Locations;