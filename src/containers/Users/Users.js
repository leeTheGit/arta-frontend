import React, {Component} from 'react';
import axios from 'axios';
class Users extends Component {

    componentDidMount () {
        axios.get('/user')
            .then( response => {
                var data = response.data.data;
            console.log(response);
            const postArray = data.slice(0,4);
            this.setState({plants: postArray});
        }).catch( response => {
            console.log(response);


        })
    }


    render() {
        return (
            <div className="Users">
                <h3>This site has HEAPS of users!</h3>
            </div>
        );
    }
}

export default Users;