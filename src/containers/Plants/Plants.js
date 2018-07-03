import React, {Component}   from 'react';
import Plantcontrols        from '../../components/Plant/Controls/Controls';
import Plantform            from '../../components/Plantform/Plantform';
import {Route}              from 'react-router-dom';
import Button               from '../../components/UI/Button/Button';
import Plant                from '../../components/Plant/Plant';
import axios                from 'axios';
import getId                from '../../service/random_id';
import Aux                  from '../../hoc/Aux';
import qs                   from 'qs';
import Modal                from '../../components/UI/Modal/Modal';
import DeleteModal          from '../../components/Room/DeleteModal';
import Separator            from '../../components/UI/Separator/Separator';


class Plants extends Component {

    state = {
        plants : [],
        selected: null,
        new : null,
        deleteModal: false,
    }

    fetchPlants = () => {
        return axios.get('/plant')
        .then( response => {
            var data = response.data.data;
            if (data) {
                this.setState({plants: data});
            }
        }).catch( response => {
            // console.log(response);
        });

    }

    componentDidMount () {
        this.fetchPlants();
    }



    plantClickHandler = (id) => {
        this.props.history.push('plant/' + id);
    }



    deletePlant = () => {
        const selected = this.state.selected;
        const plantId = this.state.plants[selected].id;
        axios.delete('/plant/' + plantId)
            .then( response => {
                this.setState({new: null});
                this.setState({"deleteModal" : false });
                this.fetchPlants();            
            }).catch( response => {
                console.log(response);
            });
    }


    showDeleteModal = (e, id, index) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({"deleteModal" : true });
        this.setState({selected: index});
        // this.fetchRoomLocations(id, index).then((response) => {
        //     if (response.data.data.length > 0) {
        //         this.setState({"messageModal" : true });
        //     } else {
        //         this.setState({"deleteModal" : true });
        //     }
        // });
    }

    removeModal = () => {
        this.setState({
            "deleteModal" : false
         });
    }
    removeDeleteModal = () => {
        this.setState({"deleteModal" : false });
    }












    newPlantForm = (e) => {
        console.log('new form');
        const state = {
            status: 'new',
            name: 'New plant',
            serial: getId(100)
        }
        this.setState({new: state});
    }
    setName = (name) => {
        const data = {...this.state.new}
        data.name = name;
        this.setState({new: data})
    }
    save = (e) => {
        e.preventDefault();
        const newPlant = { ...this.state.new };
        axios.post('/plant', qs.stringify(newPlant))
            .then( response => {
                console.log(response);
                this.setState({new: null});
                this.fetchPlants();            
            }).catch( response => {
                console.log(response);
            });
    }




    render() {

        const plants = this.state.plants.map(((plant, index) => {
            return (
                <Aux key={plant.serial}>
                    <Plant  key     = {plant.serial} 
                            plantid = {plant.id}
                            clicked = {this.plantClickHandler}
                            serial  = {plant.serial}
                            lifecycle = {plant.lifecycle}
                            created = {plant.created_at}
                            location = {plant.name}
                            index = {index}
                            remove= {this.showDeleteModal}
                    />
                    <Separator type="plant" />
                </Aux>
            );
        }));

        let deleteModal = null;
        if (this.state.deleteModal) {
            deleteModal = <Modal  show={this.state.deleteModal} 
                                remove={this.removeModal}>
                            <DeleteModal 
                                ok={this.deletePlant} 
                                cancel={this.removeModal}
                                />
                        </Modal>
        }


        let newPlant = null;
        if (this.state.new) {
            newPlant = (
                <li className="plant__new" key={this.state.new.serial}>
                    <input id={this.state.new.serial} value={this.state.new.name} 
                        onChange={(e) => {this.setName(e.target.value)}} /> 
                    <button onClick={this.save}>Save</button>
                    <Button btnType="new-user-form__remove" clicked={this.removeForm}></Button>
                </li>
            )
        }




        return (
            <div className="">
                <Plantcontrols newItem={this.newPlantForm} />
                {deleteModal}
                {newPlant}
                {plants}
                <Route path="/plants/new" component={Plantform} />
            </div>
        )
    }
}

export default Plants;