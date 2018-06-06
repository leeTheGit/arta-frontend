import React, {Component}   from 'react';
import axios                from 'axios';
import Spinner              from '../../components/UI/Spinner/Spinner';
import Plantdata            from './plantdata';
import moment               from 'moment';
import checklist            from '../../assets/checklist.svg';
import Button               from '../../components/UI/Button/Button';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Plant extends Component {


    state = {
        plant: [],
        date: moment()
    };

    componentWillMount() {
        axios.get('/plant/' + this.props.match.params.id + '?data=true')
        .then( response => {
            var data = response.data.data;
            if (data) {
                this.setState({plant: data});
            }
            console.log(data);
        }).catch( response => {
            // console.log(response);
        });

    }

    onDatesChange = () => {
        console.log('changed snd stuff');
    }
    onFocusChange = () => {
        console.log('changed snd stuff');
    }
    checkListHandler = () => {
        console.log('clicked the checklist');
    }

    render() {

        console.log(this.state);
        if (!this.state.plant.serial) {
            return <Spinner />
        }

        let datapoints = null;
        let otherDataPoints = null;

        let data = [];
        const now = moment();
        const born = moment(this.state.plant.created_at);
        const age = now.diff(born, 'days');
        // const age = moment.diff(moment(this.state.plant.created_at)).format("m[m] s[s]")
        if (this.state.plant.data.length > 0) {
            data = this.state.plant.data.slice(0,1)[0];

            datapoints = (
                <div className="grid" style={{overflow:'hidden'}}>
                    <Plantdata label="Temperature"  data={data.temperature} />
                    <Plantdata label="Health"       data={data.health} />
                    <Plantdata label="Humidity"     data={data.humidity} />
                    <Plantdata label="Light hours"  data={data.light_hours} />
                    <Plantdata label="Height"       data={data.height} />
                    <Plantdata label="Lux"          data={data.lux} />
                    <Plantdata label="PH"           data={data.ph} />
                </div>
            );

        }

        if (this.state.plant.data.length > 1) {
            data = this.state.plant.data.slice(1);

            otherDataPoints = data.map((d) => {
                return (
                    <div className="grid" style={{overflow:'hidden'}}>
                        <Plantdata customClass="other" label="Temperature"  data={d.temperature} />
                        <Plantdata customClass="other" label="Health"       data={d.health} />
                        <Plantdata customClass="other" label="Humidity"     data={d.humidity} />
                        <Plantdata customClass="other" label="Light hours"  data={d.light_hours} />
                        <Plantdata customClass="other" label="Height"       data={d.height} />
                        <Plantdata customClass="other" label="Lux"          data={d.lux} />
                        <Plantdata customClass="other" label="PH"           data={d.ph} />
                    </div>
                )
            } );

        }

        return (
            <div className="container single-plant u-margin-top-50">
                <SingleDatePicker 
                    date={this.state.date} // momentPropTypes.momentObj or null,
                    onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id="your_unique_id" // PropTypes.string.isRequired,
                                      
                />
                 <h1 className="single-plant__serial">{this.state.plant.serial}</h1>
                 <h2 className="single-plant__serial">{age} days old</h2>
                 <Button clicked={this.checkListHandler} btnType="single-plant__checklist-button" >
                    <img className="single-plant__checklist" src={checklist} alt="checklist" />
                </Button>
                {datapoints}
                {otherDataPoints}
            </div>
        );
    }
}

export default Plant;