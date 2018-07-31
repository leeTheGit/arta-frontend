import React, {Component}   from 'react';
import moment               from 'moment';
import axios                from 'axios';
import qs                   from 'qs';
import InputMoment          from 'input-moment';


class Calendar extends Component {

    state = {
        calendarDate: null
    };

    
    componentDidMount() {
        this.setState({ 
            calendarDate : this.props.calendarDate,
        });
    }



    handleCalendarChange = calendarDate => {
        this.setState({ calendarDate });
    };
    


    handleCalendarSave = () => {

        const date = this.state.calendarDate.format('YYYY-MM-DD HH:mm:ss');

        axios.put('/plantdata/' + this.props.plantdataId, qs.stringify( {'time': date} ) )
        .then( response => {
            this.props.unmount();
            
            if (response.data.data) {
                this.props.reFetch()
            }
        
        }).catch( response => {
            // console.log(response);
        });
    };
    


    render() {

        return (
            <div>
                <h2>Calendar</h2>
                <InputMoment
                    moment      = {this.props.calendarDate}
                    onChange    = {this.handleCalendarChange}
                    onSave      = {this.handleCalendarSave}
                    minStep     = {1} // default
                    hourStep    = {1} // default
                    prevMonthIcon="ion-ios-arrow-left" // default
                    nextMonthIcon="ion-ios-arrow-right" // default
                />
            </div>
        )
    }


}

export default Calendar;