import React, {Component} from 'react';
import axios from 'axios';
import Plant from '../../components/Plant/Plant';
import Plantform from '../../components/Plantform/Plantform';

class Plants extends Component {

    state = {
        plants : []
    }

    componentDidMount () {
        axios.get('/plant')
            .then( response => {
                var data = response.data.data;
            console.log(response);
            const postArray = data;
            this.setState({plants: postArray});
        }).catch( response => {
            console.log(response);


        })
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
                {plants}
                <Plantform submitHandler={this.submitHandler}/>
                {/* <Plants />  */}
            </div>
        )
    }
}

export default Plants;