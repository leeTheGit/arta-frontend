import React, {Component}       from 'react';
import Button                   from '../UI/Button/Button';
import axios                    from 'axios';
import qs                       from 'qs';


class Newroom extends Component {

    state = {
        name : this.props.name,
    }


    save = () => {
        console.log('saving');
        const newRoom = { ...this.state };
        axios.post('/room', qs.stringify(newRoom))
            .then( response => {
                this.props.fetch();
            }).catch( response => {
                console.log(response);
            });

    }

    setName = (name) => {
        this.setState({name})
    }


    render() {
        return (
            <li className="room room--new" key={this.props.id}>
                <input type="text" className="room__input" value={this.state.name} placeholder="enter a name..." onChange={(e) => {this.setName(e.target.value)}}/>
                <div className="room__spacer"></div>
                <Button btnType="room__save" clicked={() => this.save()}></Button>
            </li>
        )
    }
}

export default Newroom;