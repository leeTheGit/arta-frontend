import React, {Component}   from 'react';
import Plantcontrols        from '../../components/Plant/Controls/Controls';
import Plantform            from '../../components/Plantform/Plantform';
import {Route}              from 'react-router-dom';
import Plant                from '../../components/Plant/Plant';
import axios                from 'axios';



class Plants extends Component {

    state = {
        plants : []
    }

    componentDidMount () {
        axios.get('/plant')
            .then( response => {
                var data = response.data.data;
                if (data) {
                    this.setState({plants: data});
                }
            }).catch( response => {
                // console.log(response);
            });
    }


    render() {

        const plants = this.state.plants.map(plant => {
            return (
                <Plant  key     = {plant.id} 
                        plantid = {plant.id}
                        serial  = {plant.serial}
                        lifecycle = {plant.lifecycle}
                        created = {plant.created_at}
                />
            );
        });



        return (
            <div className="plant">
                <h1>Hi I'm a plant!</h1>
                <Plantcontrols />
                {plants}
                <Route path="/plants/new" component={Plantform} />
            </div>
        )
    }
}

export default Plants;