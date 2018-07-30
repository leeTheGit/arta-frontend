import React from 'react';
import PlantdataFormItem    from './PlantdataFormItem';
import PlantdataSave        from './PlantdataSave';

const plantdataform = (props) => {
    console.log(props);
    return (
        <div className="single-plant__grid" style={{overflow:'hidden'}}>
            <PlantdataFormItem label="Temperature"  change={ props.change } data={props.temperature   || ''} />
            <PlantdataFormItem label="Light hours"  change={ props.change } data={props.light_hours   || ''} />
            <PlantdataFormItem label="Humidity"     change={ props.change } data={props.humidity      || ''} />
            <PlantdataFormItem label="Health"       change={ props.change } data={props.health        || ''} />
            <PlantdataFormItem label="Height"       change={ props.change } data={props.height        || ''} />
            <PlantdataFormItem label="Lux"          change={ props.change } data={props.lux           || ''} />
            <PlantdataFormItem label="PH"           change={ props.change } data={props.ph            || ''} />
            <PlantdataSave     label="Save"         click ={ props.click}   customClass="save" />
        </div>

    )
}

export default plantdataform;