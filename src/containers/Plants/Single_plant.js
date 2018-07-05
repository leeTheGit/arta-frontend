import React, {Component}   from 'react';
import Plantcontrols        from '../../components/Plant/Controls/Controls';
import Plantdata            from './plantdata';
import Plantdataline        from '../../components/Plant/Plantdataline';
import Plantdataoptions     from '../../components/Plant/Plantdataoptions';
import Plantdataheader      from '../../components/Plant/Plantdataheader';
import Plantdataform        from './Plantdataform';
import PlantdataForm       from '../../components/Plant/PlantdataForm';
import PlantdataSave       from '../../components/Plant/PlantdataSave';
import Spinner              from '../../components/UI/Spinner/Spinner';
import moment               from 'moment';
import Modal                from '../../components/UI/Modal/Modal';
import axios                from 'axios';
import qs                   from 'qs';
import Aux                  from '../../hoc/Aux';
import Separator            from '../../components/UI/Separator/Separator';


import InputMoment          from 'input-moment';
// import Button               from '../../components/UI/Button/Button';
// import 'react-dates/initialize';
// import { SingleDatePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';

class Plant extends Component {


    state = {
        plant: [],
        dataForm: {},
        new : null,
        locations:[],
        date: moment(),
        selectedData: null,
        m: moment(),
        calander: false,
    };
    
    handleChange = m => {
        console.log(m);
        this.setState({ m });
    };
    
    handleSave = () => {

        const date = this.state.m.format('YYYY-MM-DD HH:mm:ss');

        const data = this.state.plant.data[this.state.selectedData];

        axios.put('/plantdata/' + data.id, qs.stringify( {'time': date} ) )
        .then( response => {
            this.setState({ calander: false });

            if (response.data.data) {
                this.fetchPlant().then((response) => {
                    this.setState({
                        plant: response.data.data || [],
                    });
        
                });
            }
        }).catch( response => {
            // console.log(response);
        });
    };
    
    openCalander = (id, datetime) => {
        console.log(id, datetime);
        this.setState({ 
            selectedData: id,
            m: moment(datetime),
            calander: true
         });
    }
    
    
    
    fetchPlant = () => {
        return axios.get('/plant/' + this.props.match.params.id + '?data=true');
    }

    fetchLocations = () => {
        return axios.get('/location');
    }


    componentDidMount() 
    {
        axios.all([this.fetchPlant(), this.fetchLocations()])
        .then(axios.spread( (plant, locations) => {

            this.setState({
                plant: plant.data.data || [],
                locations: locations.data.data || []
            });
        }));
      
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

    }



    newPlantData = (e) => {
        console.log('new form');
        this.setState({
            new: true,
            selectedData: null,
        });
    }
    removeFormHandler = () => {
        this.setState({new:false})
    }
    removeCalanderHandler = () => {
        this.setState({calander:false})
    }






    updateData = (selected) => {
        this.setState({
            selectedData: selected,
            new: true
        });
    }

    deleteData = (id) => {
        axios.delete('/plantdata/' + id)
        .then( response => {
            console.log(response);

        }).catch( response => {
            console.log(response);
        });


    }



    updateForm = (value) => {
        console.log('updating form', value);
        const newData = {
            ...this.state.dataForm,
            ...value
        };
        this.setState({dataForm: newData}, () => console.log(this.state));
    }

    submit = (e) => {
        e.preventDefault();
        let submit = false;

        if (this.state.dataForm.data_id) {
            submit = axios.put('/plantdata/'+ this.state.data_id, qs.stringify(this.state.dataForm));
        } else {
            const data = {...this.state.dataForm};
            data.plant_id = this.state.plant.id;
            submit = axios.post('/plantdata', qs.stringify(data));
        }

        if (submit) {
            return submit.then( response => {
                this.removeFormHandler();
    
                this.fetchPlant().then( (response) => {
                    this.setState({
                        plant: response.data.data || [],
                    });
                });
            }).catch( response => {
                console.log(response);
            });

        }

        return false;
    }









    render() {

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


        let calander = null;
        if (this.state.calander) {

            calander = <Modal show="true" class_modifier="modal--date">
                <button className="user-controls__button user-controls__button--remove-calander" onClick={this.removeCalanderHandler}></button>
                <InputMoment
                    moment={this.state.m}
                    onChange={this.handleChange}
                    onSave={this.handleSave}
                    minStep={1} // default
                    hourStep={1} // default
                    prevMonthIcon="ion-ios-arrow-left" // default
                    nextMonthIcon="ion-ios-arrow-right" // default
                />
            </Modal>
        }


        let form = null;

        if (this.state.new) {
            let plantData = {};

            if (this.state.selectedData) { // then we're updating
                plantData = {
                    data_id :       this.state.plant.data[this.state.selectedData].id,
                    height :        this.state.plant.data[this.state.selectedData].height,
                    notes :         this.state.plant.data[this.state.selectedData].notes,
                    ph :            this.state.plant.data[this.state.selectedData].ph,
                    conductivity :  this.state.plant.data[this.state.selectedData].conductivity,
                    temperature :   this.state.plant.data[this.state.selectedData].temperature,
                    humidity :      this.state.plant.data[this.state.selectedData].humidity,
                    lux :           this.state.plant.data[this.state.selectedData].lux,
                    light_hours :   this.state.plant.data[this.state.selectedData].light_hours,
                    health :        this.state.plant.data[this.state.selectedData].health,
                };
            }

            form = <div className="single-plant__grid" style={{overflow:'hidden'}}>
                <PlantdataForm label="Temperature"  change={ this.updateForm } data={data.temperature} />
                <PlantdataForm label="Health"       change={ this.updateForm } data={data.health} />
                <PlantdataForm label="Humidity"     change={ this.updateForm } data={data.humidity} />
                <PlantdataForm label="Light hours"  change={ this.updateForm } data={data.light_hours} />
                <PlantdataForm label="Height"       change={ this.updateForm } data={data.height} />
                <PlantdataForm label="Lux"          change={ this.updateForm } data={data.lux} />
                <PlantdataForm label="PH"           change={ this.updateForm } data={data.ph} />
                <PlantdataSave label="Save"          click={this.submit}       customClass="save" />
            </div>


            // form = <Modal show="true">
            //             <Plantdataform 
            //                 removeForm =    {this.removeFormHandler}
            //                 plant_id =      {this.state.plant.id}
            //                 {...plantData}
            //             />
            //         </Modal>
        }



        // const age = moment.diff(moment(this.state.plant.created_at)).format("m[m] s[s]")

        // if (this.state.plant.data.length > 0) {
        //     data = this.state.plant.data.slice(0,1)[0];
        //     const recent_date = moment(data.time).format('DD MMM');
        //     const data_date = moment(data.time).format('YYYY-MM-DD HH:mm:ss');

        //     datapoints = (
        //         <Aux>
        //             <time dateTime={data_date} onClick={() => this.openCalander(0, data_date)}>{recent_date}</time>
        //             <div className="single-plant__grid" style={{overflow:'hidden'}}>
        //                 <Plantdata label="Temperature"  data={data.temperature} />
        //                 <Plantdata label="Health"       data={data.health} />
        //                 <Plantdata label="Humidity"     data={data.humidity} />
        //                 <Plantdata label="Light hours"  data={data.light_hours} />
        //                 <Plantdata label="Height"       data={data.height} />
        //                 <Plantdata label="Lux"          data={data.lux} />
        //                 <Plantdata label="PH"           data={data.ph} />
        //             </div>
        //         </Aux>
        //     );

        // }

        if (this.state.plant.data.length > 1) {
            data = this.state.plant.data.slice(1);

            otherDataPoints = data.map((d, i) => {
                console.log(d);
                const date = moment(d.time).format('DD MMM');

                return (
                    <Aux key={i}>
                        
                        <ul key={i} className="plant-data-line" style={{overflow:'hidden'}}>
                            <Plantdataline customClass="" data={date} click={() => this.openCalander(i+1, d.time)}/>
                            <Plantdataline customClass="" data={d.temperature} />
                            <Plantdataline customClass="" data={d.health} />
                            <Plantdataline customClass="" data={d.humidity} />
                            <Plantdataline customClass="" data={d.light_hours} />
                            <Plantdataline customClass="" data={d.height} />
                            <Plantdataline customClass="" data={d.lux} />
                            <Plantdataline customClass="" data={d.ph} />
                            <Plantdataoptions customClass="" updateData={() => this.updateData(i+1)} deleteData={() => this.deleteData(d.id)} />

                        </ul>
                        <Separator type="plant" />

                    </Aux>
                )
            } );

        }

        return (
            <div className="container single-plant">

                <Plantcontrols 
                    newItem={this.newPlantData} 
                    cancel={this.dataForm} 
                    adButton={this.state.new}
                    />


                {calander}

                <h1 className="single-plant__serial">{this.state.plant.serial}</h1>
                <h2 className="single-plant__serial">{age} days old</h2>

                <select className="single-plant__locations" value={this.state.plant.location} onChange={(e) => this.selectLocation(e)}>
                    {locationElements}
                </select>

                {form}

                {datapoints}
                <Plantdataheader />
                <Separator type="plant" />
                {otherDataPoints}
            </div>
        );
    }
}

export default Plant;