import React, {Component}   from 'react';
import axios                from 'axios';
import qs                   from 'qs';

class Plantdataform extends Component {


    state = {
        conductivity:   this.props.conductivity || "",
        light_hours:    this.props.light_hours  || "",
        temperature:    this.props.temperature  || "",
        plant_id:       this.props.plant_id     || null,
        humidity:       this.props.humidity     || "",
        data_id:        this.props.data_id      || null,
        health:         this.props.health       || "",
        height:         this.props.height       || "",
        notes:          this.props.notes        || "",
        lux:            this.props.lux          || "",
        ph:             this.props.ph           || "",
    };



    updateForm = (value) => {
        console.log(value);
        const newData = {
            ...this.state,
            ...value
        };
        this.setState({...newData}, () => console.log(this.state));
    }

    submit = (e) => {
        e.preventDefault();
        this.props.removeForm();

        if (this.state.data_id) {
            return axios.put('/plantdata/'+ this.state.data_id, qs.stringify(this.state))
        }

        return axios.post('/plantdata', qs.stringify(this.state))
            .then( response => {
                // var id = response.data.data.id;
                // newUser['id'] = id;
                // const users = [...this.state.users];
                // users.push(newUser);
                // this.setState({ 
                //     users:users,
                //     newUser: false, 
                //     newUserData: {} 
                // });
            }).catch( response => {
                console.log(response);
            });

    }

    render() {
    
        console.log(this.state);
        return (
            <div className="plant-data-form">
                <button className="new-user-form__remove" onClick={this.props.removeForm}></button>

                <h1>a plant data form!!</h1>
                <form>
                    <label className="plant-data-form__label">Temperature</label>
                    <input className="plant-data-form__input" name="Temperature"    value={this.state.temperature}      onChange={(e) => {this.updateForm({temperature: e.target.value})}} />
                    <label className="plant-data-form__label">Humidity</label>
                    <input className="plant-data-form__input" name="humidity"       value={this.state.humidity}         onChange={(e) => {this.updateForm({humidity: e.target.value})}} />
                    <label className="plant-data-form__label">Height</label>
                    <input className="plant-data-form__input" name="height"         value={this.state.height}           onChange={(e) => {this.updateForm({height: e.target.value})}} />
                    <label className="plant-data-form__label">Ph</label>
                    <input className="plant-data-form__input" name="ph"             value={this.state.ph}               onChange={(e) => {this.updateForm({ph: e.target.value})}} />
                    <label className="plant-data-form__label">Conductivity</label>
                    <input className="plant-data-form__input" name="conductivity"   value={this.state.conductivity}     onChange={(e) => {this.updateForm({conductivity: e.target.value})}} />
                    <label className="plant-data-form__label">Lux</label>
                    <input className="plant-data-form__input" name="lux"            value={this.state.lux}              onChange={(e) => {this.updateForm({lux: e.target.value})}} />
                    <label className="plant-data-form__label">Light hours</label>
                    <input className="plant-data-form__input" name="light_hours"    value={this.state.light_hours}      onChange={(e) => {this.updateForm({light_hours: e.target.value})}} />
                    <label className="plant-data-form__label">Health</label>
                    <input className="plant-data-form__input" name="health"         value={this.state.health}           onChange={(e) => {this.updateForm({health: e.target.value})}} />

                    <label className="plant-data-form__label">Notes</label>
                    <textarea name="notes" value={this.state.notes} onChange={(e) => {this.updateForm({notes: e.target.value})}}></textarea>


                </form>
                <button onClick={this.submit}>Submit</button>

            </div>
        )
    
    
    }
}

export default Plantdataform;