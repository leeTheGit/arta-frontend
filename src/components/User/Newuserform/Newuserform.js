import React, {Component}   from 'react';
import Button               from '../../UI/Button/Button';
import axios                from 'axios';

class NewUserForm extends Component {

    groups = [];
        
    componentDidMount() {
        axios.get('/group')
            .then( response => {
                var data = response.data.data;

                this.groups = data;
                this.props.setGroups(data);

                for (let i=0; i<data.length;i++) {
                    if (data[i].groupname === 'Arta') {

                        this.props.updateForm({groupid: data[i].groupid});
                    }
                }
            }).catch( response => {
                console.log(response);
            });
    }

    render() {


        const groupElements = this.groups.map((group) => {
            return <option key={group.groupid} defaultValue value={group.groupid}> {group.groupname}</option>
        });

        return (
            <div className="new-user-form">
                <Button btnType="new-user-form__remove" clicked={this.props.removeForm}></Button>
                <h2>New user</h2>
                <form>
                    
                    <div className="user__inputgroup">
                        <label>Username</label>
                        <input type="text"  onChange={(e) => {this.props.updateForm({username: e.target.value})}} />
                    </div>

                    <div className="user__inputgroup">
                        <label id="firstname">First Name</label>
                        <input type="text" name="firstname" val="" onChange={(e) => {this.props.updateForm({firstname: e.target.value})}} />
                    </div>

                    <div className="user__inputgroup">
                        <label id="lastname">Last Name</label>
                        <input type="text" name="lastname" val=""  onChange={(e) => {this.props.updateForm({lastname: e.target.value})}} />
                    </div>

                    <div className="user__inputgroup">
                        <label id="password">Password</label>
                        <input type="text" name="password" val=""  onChange={(e) => {this.props.updateForm({password: e.target.value})}} />
                    </div>

                    <div className="user__inputgroup">
                        <select name="cars">
                            {groupElements}
                        </select>
                    </div>
    
    
                    <button onClick={this.props.addUser}>Submit</button>
                </form>
            </div>
        );
    }


}

export default NewUserForm;