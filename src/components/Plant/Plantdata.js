import React                from 'react';
import moment               from 'moment';
import Plantdataline        from './Plantdataline';
import PlantdataDate        from './PlantdataDate';

const plantdata = (props) => {
    const date  = moment(props.time).format('YYYY-MM-DDTHH:mm:ss');
    const month = moment(props.time).format('MMM');
    const day   = moment(props.time).format('DD');
    const check = (props.check) ? "checked" : "check";

    return (
        <ul key={props.i} className={"plant-data-line " + props.class} onClick={(e) => props.selectRow(e, props.i)} style={{overflow:'hidden'}}>
            <PlantdataDate customClass="" date={date} month={month} day={day} click={(e) => props.calendar(e, props.i, props.time)}/>
            <Plantdataline customClass="" data={props.temperature} />
            <Plantdataline customClass="" data={props.health} />
            <Plantdataline customClass="" data={props.humidity} />
            <Plantdataline customClass="" data={props.light_hours} />
            <Plantdataline customClass="" data={props.height} />
            <Plantdataline customClass="" data={props.lux} />
            <Plantdataline customClass="" data={props.ph} click={() => console.log('clicked')}/>
            <Plantdataline customClass={check} click={() => props.checkHandler(props.i)} />
            {/* <Plantdataoptions customClass="" updateData={() => this.updateData(i+1)} deleteData={() => this.deleteData(d.id)} /> */}
        </ul>
    );

}


export default plantdata;