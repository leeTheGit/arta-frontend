import React, {Component}   from 'react';
import { connect }          from 'react-redux';
import Plantdataheader      from '../../components/Plant/Plantdataheader';
import PlantdataForm        from '../../components/Plant/PlantdataForm';
import PlantdataSave        from '../../components/Plant/PlantdataSave';
import DeleteModal          from '../../components/Plant/Deletemodal';
import Separator            from '../../components/UI/Separator/Separator';
import Plantdata            from '../../components/Plant/Plantdata';
import Controls             from '../../components/Controls/Controls';
import Spinner              from '../../components/UI/Spinner/Spinner';
import moment               from 'moment';
import Modal                from '../../components/UI/Modal/Modal';
import axios                from 'axios';
import Aux                  from '../../hoc/Aux';
import qs                   from 'qs';


import Plantdataform        from './Plantdataform';
import Plantdataoptions     from '../../components/Plant/Plantdataoptions';
// import Plantdataline        from '../../components/Plant/Plantdataline';
// import PlantdataDate        from '../../components/Plant/PlantdataDate';


import InputMoment          from 'input-moment';


class Plant extends Component {

    state = {
        m            : moment(),
        new          : null,
        date         : moment(),
        plant        : [],
        update       : false,
        authUser     : null, // redux
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
    
    



    
    selectRow = (e, selectedData) => {
        console.log('selecting row');
        console.log(selectedData);
        e.stopPropagation();
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

        const data = { ...this.state.plant.data[this.state.selectedData] }
        console.log(data);
        this.setState({
            update: true,
            dataForm: data,
        });
    }

    // updateData = (selected) => {
    //     this.setState({
    //         selectedData: selected,
    //         new: true
    //     });
    // }

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

        this.setState({"deleteModal" : true });
    }

    checkData = (user) => {
        console.log(user);
    }


    checkHandler = (dataIndex) => {
        const id = this.state.plant.data[dataIndex].id;
        const userid = this.props.authUser.id;
        
        console.log(id, userid);
        axios.put('/plantdata/' + id, qs.stringify( {'user_check': userid} ) )
        .then( response => {
            console.log(response);
            if (response.data.data) {
            }
        }).catch( response => {
            // console.log(response);
        });

    }



    updateForm = (value) => {

        const newData = {
            ...this.state.dataForm,
            ...value
        };
        this.setState({dataForm: newData}, () => console.log(this.state));
    }

    submit = (e) => {
        e.preventDefault();
        let submit = false;

        if (this.state.dataForm.id) {

            submit = axios.put('/plantdata/'+ this.state.dataForm.id, qs.stringify(this.state.dataForm));
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

            let data = {}
            if (this.state.selectedData != null) { // then we're updating
                data = {...this.state.dataForm}
            }
            console.log(data);
            form =  <Modal show="true" remove={this.removeFormHandler}>
                        <div className="single-plant__grid" style={{overflow:'hidden'}}>
                            <PlantdataForm label="Temperature"  change={ this.updateForm } data={data.temperature   || ''} />
                            <PlantdataForm label="Light hours"  change={ this.updateForm } data={data.light_hours   || ''} />
                            <PlantdataForm label="Humidity"     change={ this.updateForm } data={data.humidity      || ''} />
                            <PlantdataForm label="Health"       change={ this.updateForm } data={data.health        || ''} />
                            <PlantdataForm label="Height"       change={ this.updateForm } data={data.height        || ''} />
                            <PlantdataForm label="Lux"          change={ this.updateForm } data={data.lux           || ''} />
                            <PlantdataForm label="PH"           change={ this.updateForm } data={data.ph            || ''} />
                            <PlantdataSave label="Save"         click={this.submit}        customClass="save" />
                        </div>
                    </Modal>

        }




        if (this.state.plant.data.length > 1) {
            data = this.state.plant.data;

            datapoints = data.map((d, i) => {

                const selectedClass = (this.state.selectedData === i) ? "plant-data-line--selected" : "";
                return (
                    <Aux key={i}>
                        <Plantdata 
                            checkHandler= {this.checkHandler}
                            temperature = {d.temperature}
                            light_hours = {d.light_hours}
                            selectRow   = {this.selectRow}
                            calendar    = {this.opencalendar}
                            humidity    = {d.humidity}
                            health      = {d.health}
                            height      = {d.height}
                            check       = {d.user_check}
                            class       = {selectedClass}
                            time        = {d.time}
                            lux         = {d.lux}
                            ph          = {d.ph}
                            i           = {i}
                        />
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

                <Controls 
                    newItem  = {this.newPlantData} 
                    editItem = {this.editData}
                    cancel   = {this.showDeleteModal} 
                    adButton = {this.state.new}
                    update   = {this.state.selectedData != null || '' }
                    click    = {this.removeFormHandler}
                />
                
                {form}

                <Plantdataheader 
                    checkClick={this.checkData} 
                />
                <Separator type="plant" />
                {datapoints}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        authUser: state.authUser
    };
}

export default connect(mapStateToProps)(Plant);