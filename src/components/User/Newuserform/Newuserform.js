import React, {Component} from 'react';
import classes from './Newuserform.css';
import Button from '../../UI/Button/Button';
import axios from 'axios';

class NewUserForm extends Component {

    state = {
        groups: []
    };

    componentDidMount() {
        axios.get('/group')
            .then( response => {
                var data = response.data.data;
                console.log(data);
                this.setState({groups:data});
            }).catch( response => {
                console.log(response);
            });
    }

    render() {


        const groups = this.state.groups.map((group) => {
            return <option key={group.groupid} selected value={group.groupid}> {group.groupname}</option>
        })

        return (
            <div className={classes.Newuserform}>
                <Button clicked={this.props.removeForm}>X</Button>
                <h2>New user</h2>
                <form>
                    <label>Username</label>
                    <input type="text"  onChange={(e) => {this.props.updateForm({username: e.target.value})}} />
    
                    <label id="firstname">First Name</label>
                    <input type="text" name="firstname" val="" onChange={(e) => {this.props.updateForm({firstname: e.target.value})}} />
                    
                    <label id="lastname">Last Name</label>
                    <input type="text" name="lastname" val=""  onChange={(e) => {this.props.updateForm({lastname: e.target.value})}} />
    
                    <label id="password">Password</label>
                    <input type="text" name="password" val=""  onChange={(e) => {this.props.updateForm({password: e.target.value})}} />
                    <select name="cars">
                        {groups}
                    </select>
                    <button onClick={this.props.addUser}>Submit</button>
                </form>
            </div>
        );
    }


}

export default NewUserForm;