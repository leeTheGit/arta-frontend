import React, {Component}   from 'react';
import { connect }          from 'react-redux';
import Plantdataheader      from '../../components/Plant/Plantdataheader';
import PlantdataForm        from '../../components/Plant/PlantdataForm';
import Separator            from '../../components/UI/Separator/Separator';
import Plantdata            from '../../components/Plant/Plantdata';
import Controls             from '../../components/Controls/Controls';
import Calendar             from '../../components/Calendar/Calendar';
import Spinner              from '../../components/UI/Spinner/Spinner';
import moment               from 'moment';
import Choice               from '../../components/Modal/Choice';
import Modal                from '../../components/UI/Modal/Modal';
import axios                from 'axios';
import Aux                  from '../../hoc/Aux';
import qs                   from 'qs';




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
        checkError   : false,
        deleteModal  : false,
        selectedData : null,
        calendarDate : null,
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

    fetchPlantAndSet = () => {
        return this.fetchPlant().then((response) => {
                this.setState({
                    plant: response.data.data || [],
                });

            });
    }

    fetchLocations = () => {
        return axios.get('/location');
    }





    // ********
    // CALENDAR
    opencalendar = (e, id, datetime) => {
        e.stopPropagation();

        this.setState({ 
            calendarDate : moment(datetime),
            calendar     : true,
            selectedData : id,
         });
    }

    



    
    selectRow = (e, selectedData) => {
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
    removeCalendarHandler = () => {
        this.setState({calendar:false});
        this.fetchPlantAndSet();
    }




    editData = (e) => {
        e.stopPropagation();
        const data = { ...this.state.plant.data[this.state.selectedData] }
        this.setState({
            update: true,
            dataForm: data,
        });
    }


    deleteData = () => {
        const id = this.state.plant.data[this.state.selectedData].id;
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


    checkHandler = (dataIndex) => {
        const id = this.state.plant.data[dataIndex].id;
        const userid = this.props.authUser.id;
        axios.put('/plantdata/' + id, qs.stringify( {'user_check': userid} ) )
        .then( response => {

            if (response.data.data === false) {
                return this.setState({'checkError': true});
            }
            this.fetchPlant()
                .then( (response) => {
                    this.setState({
                        plant: response.data.data || [],
                    });
                });

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
            data.user_id = this.props.authUser.id;
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


    choiceDismiss = () => {
        this.setState({checkError: false});
    }

    renderPlantData = () => {
        const plantData = this.state.plant.data;
    
        let datapoints = plantData.map((d, i) => {
    
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
        return  datapoints;
    }



    render() {

        if (!this.state.plant.serial) {
            return <Spinner />
        }

        let choiceModal = null;
        let deleteModal = null;
        let datapoints  = null;
        let calendar    = null;
        let form        = null;
        
        const born = moment(this.state.plant.created_at);
        const age  = moment().diff(born, 'days');

        if (this.state.checkError) {
            choiceModal = <Choice message="You cannot check this data, as you added it." ok={this.choiceDismiss} cancel={this.choiceDismiss} />
        }

        if (this.state.deleteModal) {
            deleteModal = <Modal  show={this.state.deleteModal} 
                                remove={this.removeFormHandler}>
                            <Choice 
                                message="Are you sure you want to delete this data?"
                                ok={this.deleteData} 
                                cancel={this.removeFormHandler}
                                />
                        </Modal>
        }


        
        const locationElements = this.state.locations.map((location) => {
            return <option key={location.id} value={location.id}> {location.name}</option>
        });


        if (this.state.calendar) {
            const plantDataId = this.state.plant.data[this.state.selectedData].id
            calendar = 
                <Modal show="true" class_modifier="modal--date" remove={this.removeCalendarHandler}>
                    <Calendar calendarDate={this.state.calendarDate} plantdataId={plantDataId} unmount={this.removeCalendarHandler} />
                </Modal>
        }



        if (this.state.new || this.state.update) {
            let data = {}
            if (this.state.selectedData != null) { // then we're updating
                data = {...this.state.dataForm}
            }
            form =  <Modal show="true" remove={this.removeFormHandler}>
                        <PlantdataForm {...data} click={this.submit} change={this.updateForm} />
                    </Modal>

        }

        if (this.state.plant.data.length > 1) {
            datapoints = this.renderPlantData();
        }

        return (
            <div className="container single-plant">

                {choiceModal}
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