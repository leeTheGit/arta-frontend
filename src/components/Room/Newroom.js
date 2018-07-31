import React, {Component}       from 'react';
import Button                   from '../UI/Button/Button';
import axios                    from 'axios';
import qs                       from 'qs';


class Newroom extends Component {

    state = {
        name : this.props.name,
    }

    componentDidMount(){
        this.nameInput.focus(); 
     }
     

    save = (e) => {
        e.preventDefault();
        console.log('saving');
        const newRoom = { ...this.state };
        
        if (newRoom.name === "") {
            console.log('returning');
            return;
        }
        console.log('saving new room');
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
                <form className="room__form" onSubmit={(e) => this.save(e)}>
                    <input ref={(input) => { this.nameInput = input; }} type="text" className="room__input" value={this.state.name} placeholder="enter a name..." onChange={(e) => {this.setName(e.target.value)}}/>
                    <Button btnType="room__save" clicked={(e) => this.save(e)}></Button>
                </form>
            </li>
        )
    }
}

export default Newroom;