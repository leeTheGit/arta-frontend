import React, {Component}   from 'react';
import Plantdataheader      from '../../components/Plant/Plantdataheader';
import Plantcontrols        from '../../components/Plant/Controls/Controls';
import Plantdataline        from '../../components/Plant/Plantdataline';
import PlantdataDate        from '../../components/Plant/PlantdataDate';
import PlantdataForm        from '../../components/Plant/PlantdataForm';
import PlantdataSave        from '../../components/Plant/PlantdataSave';
import DeleteModal          from '../../components/Plant/Deletemodal';
import Separator            from '../../components/UI/Separator/Separator';
import Spinner              from '../../components/UI/Spinner/Spinner';
import moment               from 'moment';
import Modal                from '../../components/UI/Modal/Modal';
import axios                from 'axios';
import Aux                  from '../../hoc/Aux';
import qs                   from 'qs';
import Plantdata            from './plantdata';
import Plantdataform        from './Plantdataform';
import Plantdataoptions     from '../../components/Plant/Plantdataoptions';


import InputMoment          from 'input-moment';


class Plant extends Component {

    state = {
        m            : moment(),
        new          : null,
        date         : moment(),
        plant        : [],
        update       : false,
        calendar     : false,
        dataForm     : {},
        locations    : [],
        deleteModal  : false,
        selectedData : null,
    };
    
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

    fetchPlant = () => {
        return axios.get('/plant/' + this.props.match.params.id + '?data=true');
    }

    fetchLocations = () => {
        return axios.get('/location');
    }





    // ********
    // CALENDAR
    opencalendar = (e, id, datetime) => {
        console.log('opening calander');
        e.stopPropagation();

        this.setState({ 
            m            : moment(datetime),
            calendar     : true,
            selectedData : id,
         });
    }

    handleCalendarChange = m => {
        this.setState({ m });
    };
    
    handleCalendarSave = () => {

        const date = this.state.m.format('YYYY-MM-DD HH:mm:ss');

        const data = this.state.plant.data[this.state.selectedData];

        axios.put('/plantdata/' + data.id, qs.stringify( {'time': date} ) )
        .then( response => {
            this.setState({ calendar: false });

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
    
    



    
    selectRow= (e, selectedData) => {
        e.stopPropagation();
        console.log('selecting row');

        this.setState({
            selectedData,
        });
        
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
        e.stopPropagation();

        this.setState({
            new         : true,
            selectedData: null,
        });
    }
    removeFormHandler = () => {
        this.setState({
            new:false,
            update:false,
            selectedData: null,
            deleteModal: false,
        });
    }
    removecalendarHandler = () => {
        this.setState({calendar:false})
    }




    editData = (e) => {
        e.stopPropagation();

        console.log('editing item');
        const data = { ...this.state.plant.data[this.state.selectedData] }

        this.setState({
            update: true,
            dataForm: data,
        });

    }

    updateData = (selected) => {
        this.setState({
            selectedData: selected,
            new: true
        });
    }

    deleteData = () => {

        const id = this.state.plant.data[this.state.selectedData].id;


        console.log(id);

        axios.delete('/plantdata/' + id)
        .then( response => {
            this.setState({deleteModal: false});
            this.fetchPlant()
             .then( (response) => {
                this.setState({
                    plant: response.data.data || [],
                });
            });
        }).catch( response => {
            console.log(response);
        });
    }

    showDeleteModal = (e, id, index) => {
        e.stopPropagation();

        console.log('setting show delete');
        this.setState({"deleteModal" : true });
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
        console.log('rendering');
        if (!this.state.plant.serial) {
            return <Spinner />
        }

        let datapoints = null;
        let otherDataPoints = null;

        let data = [];
        const now = moment();
        const born = moment(this.state.plant.created_at);
        const age = now.diff(born, 'days');


        let deleteModal = null;
        if (this.state.deleteModal) {
            deleteModal = <Modal  show={this.state.deleteModal} 
                                remove={this.removeFormHandler}>
                            <DeleteModal 
                                ok={this.deleteData} 
                                cancel={this.removeFormHandler}
                                />
                        </Modal>
        }





        
        const locationElements = this.state.locations.map((location) => {
            return <option key={location.id} value={location.id}> {location.name}</option>
        });


        let calendar = null;
        if (this.state.calendar) {

            calendar = <Modal show="true" class_modifier="modal--date" remove={this.removecalendarHandler}>
                {/* <button className="user-controls__button user-controls__button--remove-calendar" onClick={this.removecalendarHandler}></button> */}
                <InputMoment
                    moment={this.state.m}
                    onChange={this.handleCalendarChange}
                    onSave={this.handleCalendarSave}
                    minStep={1} // default
                    hourStep={1} // default
                    prevMonthIcon="ion-ios-arrow-left" // default
                    nextMonthIcon="ion-ios-arrow-right" // default
                />
            </Modal>
        }


        let form = null;

        if (this.state.new || this.state.update) {
            console.log('RAHHHHHHHHHHHH!!!!!!!!!!!!!');
            let data = {}
            // if (this.state.selectedData) { // then we're updating
                data = {...this.state.dataForm}
            // }
            console.log(data);
            form = 
            <Modal show="true" remove={this.removeFormHandler}>
                <div className="single-plant__grid" style={{overflow:'hidden'}}>
                    <PlantdataForm label="Temperature"  change={ this.updateForm } data={data.temperature || ''} />
                    <PlantdataForm label="Health"       change={ this.updateForm } data={data.health || ''} />
                    <PlantdataForm label="Humidity"     change={ this.updateForm } data={data.humidity || ''} />
                    <PlantdataForm label="Light hours"  change={ this.updateForm } data={data.light_hours || ''} />
                    <PlantdataForm label="Height"       change={ this.updateForm } data={data.height || ''} />
                    <PlantdataForm label="Lux"          change={ this.updateForm } data={data.lux || ''} />
                    <PlantdataForm label="PH"           change={ this.updateForm } data={data.ph || ''} />
                    <PlantdataSave label="Save"         click={this.submit}        customClass="save" />
                </div>
            </Modal>

        }




        if (this.state.plant.data.length > 1) {
            data = this.state.plant.data.slice(1);

            otherDataPoints = data.map((d, i) => {

                const date = moment(d.time).format('YYYY-MM-DDTHH:mm:ss');
                const month = moment(d.time).format('MMM');
                const day = moment(d.time).format('DD');
                const selectedClass = (this.state.selectedData === i+1) ? "plant-data-line--selected" : "";
                return (
                    <Aux key={i}>
                        <ul key={i} className={"plant-data-line " + selectedClass} onClick={(e) => this.selectRow(e, i+1)} style={{overflow:'hidden'}}>
                            <PlantdataDate customClass="" date={date} month={month} day={day} click={(e) => this.opencalendar(e, i+1, d.time)}/>
                            <Plantdataline customClass="" data={d.temperature} />
                            <Plantdataline customClass="" data={d.health} />
                            <Plantdataline customClass="" data={d.humidity} />
                            <Plantdataline customClass="" data={d.light_hours} />
                            <Plantdataline customClass="" data={d.height} />
                            <Plantdataline customClass="" data={d.lux} />
                            <Plantdataline customClass="" data={d.ph} click={() => console.log('clicked')}/>
                            {/* <Plantdataoptions customClass="" updateData={() => this.updateData(i+1)} deleteData={() => this.deleteData(d.id)} /> */}
                        </ul>
                        <Separator type="plant" />

                    </Aux>
                )
            } );

        }

        return (
            <div className="container single-plant">


                {deleteModal}
                {calendar}

                <h1 className="single-plant__serial">{this.state.plant.serial}</h1>
                <h2 className="single-plant__serial">{age} days old</h2>

                <select className="single-plant__locations" value={this.state.plant.location} onChange={(e) => this.selectLocation(e)}>
                    {locationElements}
                </select>

                <Plantcontrols 
                    newItem  = {this.newPlantData} 
                    editItem = {this.editData}
                    cancel   = {this.showDeleteModal} 
                    adButton = {this.state.new}
                    update   = {this.state.selectedData || '' }
                    click    = {this.removeFormHandler}
                />
                
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