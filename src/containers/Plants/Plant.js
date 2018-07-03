import React, {Component}   from 'react';
import Plantcontrols        from '../../components/Plant/Controls/Controls';
import Plantdata            from './plantdata';
import Plantdataform        from './Plantdataform';
import checklist            from '../../assets/checklist.svg';
import Spinner              from '../../components/UI/Spinner/Spinner';
import moment               from 'moment';
import Button               from '../../components/UI/Button/Button';
import Modal                from '../../components/UI/Modal/Modal';
import axios                from 'axios';
import qs                   from 'qs';
import Aux                  from '../../hoc/Aux';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Plant extends Component {


    state = {
        plant: [],
        new : null,
        locations:[],
        date: moment(),
        selectedData: null
    };

    fetchPlants = () => {
        console.log()
        return axios.get('/plant/' + this.props.match.params.id + '?data=true');
    }

    fetchLocations = () => {
        return axios.get('/location');
    }


    componentDidMount() 
    {
        axios.all([this.fetchPlants(), this.fetchLocations()])
        .then(axios.spread( (plant, locations) => {

            this.setState({
                plant: plant.data.data || [],
                locations: locations.data.data || []
            });
        }));
      
    }

    onDatesChange = () => {
        console.log('changed snd stuff');
    }
    onFocusChange = () => {
        console.log('changed snd stuff');
    }
    checkListHandler = () => {
        console.log('clicked the checklist');
    }

    selectLocation = (e) => {
        const plant = {...this.state.plant};
        const value = e.target.value;
        axios.put('/plant/' + this.state.plant.id, qs.stringify( {'location': value} ) )
        .then( response => {
            if (response.data.data) {
                plant.location = value;
                this.setState({plant: plant});
            }
        }).catch( response => {
            // console.log(response);
        });

        console.log('location selected');
    }



    newPlantData = (e) => {
        console.log('new form');
        this.setState({new: true});
    }
    removeFormHandler = () => {
        this.setState({new:false})
    }






    updateData = (selected) => {
        this.setState({
            selectedData: selected,
            new: true
        });

        console.log(this.state.plant.data[selected]);
    }












    render() {

        console.log(this.state);
        if (!this.state.plant.serial) {
            return <Spinner />
        }

        let datapoints = null;
        let otherDataPoints = null;

        let data = [];
        const now = moment();
        const born = moment(this.state.plant.created_at);
        const age = now.diff(born, 'days');

        
        const locationElements = this.state.locations.map((location) => {
            return <option key={location.id} value={location.id}> {location.name}</option>
        });


        let form = null;
        if (this.state.new) {
            form = <Modal show="true">
                        <Plantdataform 
                            removeForm =    {this.removeFormHandler}
                            plant_id =      {this.state.plant.id}
                            data_id =       {this.state.plant.data[this.state.selectedData].id}
                            height =        {this.state.plant.data[this.state.selectedData].height}
                            notes =         {this.state.plant.data[this.state.selectedData].notes}
                            ph =            {this.state.plant.data[this.state.selectedData].ph}
                            conductivity =  {this.state.plant.data[this.state.selectedData].conductivity}
                            temperature =   {this.state.plant.data[this.state.selectedData].temperature}
                            humidity =      {this.state.plant.data[this.state.selectedData].humidity}
                            lux =           {this.state.plant.data[this.state.selectedData].lux}
                            light_hours =   {this.state.plant.data[this.state.selectedData].light_hours}
                            health =        {this.state.plant.data[this.state.selectedData].health}
                    
                        />
                    </Modal>
        }



        // const age = moment.diff(moment(this.state.plant.created_at)).format("m[m] s[s]")
        if (this.state.plant.data.length > 0) {
            data = this.state.plant.data.slice(0,1)[0];

            datapoints = (
                <div className="grid" style={{overflow:'hidden'}}>
                    <Plantdata label="Temperature"  data={data.temperature} />
                    <Plantdata label="Health"       data={data.health} />
                    <Plantdata label="Humidity"     data={data.humidity} />
                    <Plantdata label="Light hours"  data={data.light_hours} />
                    <Plantdata label="Height"       data={data.height} />
                    <Plantdata label="Lux"          data={data.lux} />
                    <Plantdata label="PH"           data={data.ph} />
                </div>
            );

        }

        if (this.state.plant.data.length > 1) {
            data = this.state.plant.data.slice(1);

            otherDataPoints = data.map((d, i) => {
                console.log(d);
                return (
                    <Aux key={i}>
                        <button className="" onClick={() =>this.updateData(i+1)}>Update</button>

                        <div key={i} className="grid" style={{overflow:'hidden'}}>
                            <Plantdata customClass="other" label="Temperature"  data={d.temperature} />
                            <Plantdata customClass="other" label="Health"       data={d.health} />
                            <Plantdata customClass="other" label="Humidity"     data={d.humidity} />
                            <Plantdata customClass="other" label="Light hours"  data={d.light_hours} />
                            <Plantdata customClass="other" label="Height"       data={d.height} />
                            <Plantdata customClass="other" label="Lux"          data={d.lux} />
                            <Plantdata customClass="other" label="PH"           data={d.ph} />
                        </div>
                    </Aux>
                )
            } );

        }

        return (
            <div className="container single-plant u-margin-top-50">

                <Plantcontrols newItem={this.newPlantData} />

                {form}

                <SingleDatePicker 
                    date={this.state.date} // momentPropTypes.momentObj or null,
                    onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id="your_unique_id" // PropTypes.string.isRequired,
                                      
                />

                <h1 className="single-plant__serial">{this.state.plant.serial}</h1>
                <h2 className="single-plant__serial">{age} days old</h2>

                <select className="single-plant__locations" value={this.state.plant.location} onChange={(e) => this.selectLocation(e)}>
                    {locationElements}
                </select>


                 <Button clicked={this.checkListHandler} btnType="single-plant__checklist-button" >
                    <img className="single-plant__checklist" src={checklist} alt="checklist" />
                </Button>
                {datapoints}
                {otherDataPoints}
            </div>
        );
    }
}

export default Plant;