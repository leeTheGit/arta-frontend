import React, {Component}   from 'react';
import UserControls         from '../components/User/Usercontrols/Usercontrols';
import axios                from 'axios';
import qs                   from 'qs';
import {
    SortableContainer, 
    SortableElement, 
    SortableHandle,
    arrayMove
} from 'react-sortable-hoc';



const DragHandle = SortableHandle(() => <span className="location__handle">::</span>);

const SortableItem = SortableElement( ( {value, click} ) =>
    <li className="location">
        <DragHandle />
        <p className="location__p" id={value.id} onClick={()=> click(value.id)}>{value.name}</p>
        {/* <Button btnType="location__delete" clicked={(e) => props.delete(props.userid, props.firstname)}></Button> */}

    </li>
);

const SortableList = SortableContainer(({items, clicked}) => {
    console.log(items);
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} click={clicked} index={value.name} value={value} />
      ))}
    </ul>
  );
});



class Locations extends Component {

    state = {
        locations: [],
        new : null
    };

    componentDidMount() {
        this.fetchLocations();
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        const {locations} = this.state;
        console.log(oldIndex, newIndex);
        this.setState({
            locations: arrayMove(locations, oldIndex, newIndex),
        });
    };
    

    fetchLocations = () => {
        axios.get('/location/')
        .then( response => {
            var data = response.data.data;
            if (data) {
                this.setState({locations: data});
            }
            console.log(data);
        }).catch( response => {
            // console.log(response);
        });
    }


    getId(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      
    newLocation = (e) => {
        const state = {
            status: 'new',
            id: this.getId(100),
            name: 'New location',
        }
        this.setState({new: state});
    }

    save = (e) => {
        e.preventDefault();

        const newLocation = { ...this.state.new };
        axios.post('/location', qs.stringify(newLocation))
            .then( response => {
                console.log(response);
                this.setState({new: null});
                this.fetchLocations();            
            }).catch( response => {
                console.log(response);
            });
    }


    setName = (e) => {
        const newLocation = {...this.state.new}
        newLocation.name = e.target.value;
        this.setState({new: newLocation})
    }

    delete = (id) => {
        console.log("deleting", id);
    }

    render() {

        if (!this.state.locations) {
            return <p>There are no locations!!</p>
        }

        let newLocation = null;

        if (this.state.new) {
            newLocation = (
                <li className="location__new" key={this.state.new.id}>
                    <input id={this.state.new.id} val={this.state.new.name} 
                        onChange={(e) => {this.setName(e)}} /> 
                    <button onClick={this.save}>Save</button>
                </li>
            )
        }
        
        const locations = <SortableList items={this.state.locations} 
                                        onSortEnd={this.onSortEnd} 
                                        useDragHandle={true} 
                                        clicked={this.delete}
                                        />
        
        return (
            
            <div>
                <UserControls newItem={this.newLocation}/>
                <div className="u-margin-top-60">
                    {newLocation}
                    {locations}
                </div>
            </div>
        );
    }
}

export default Locations;