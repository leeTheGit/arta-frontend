import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';

class Plantform extends Component {

    state = {
        serial : '',
        mortality: ''
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log('submitted');
        console.log(this.state);

        axios.post('/plant', qs.stringify(this.state))
            .then((response) => {
                if (response.status === 200) {
                    this.setState({rarp: 'er', serial: '', mortality: ''});
                }
            });
    }


    render() {

        return (
            <div className="plantForm">
                <form onSubmit={this.submitHandler}>
                    <label>Serial</label>
                    <input type="text" name="serial" value={this.state.serial} onChange={(e) => {this.setState({serial: e.target.value})}} />
                    <label>Mortality</label>
                    <input type="text" name="mortality" value={this.state.mortality} onChange={(e) => {this.setState({mortality: e.target.value})}} />
                    <button type="submit">Save</button>
                </form>
            </div>
        )    
    } 
}

export default Plantform;