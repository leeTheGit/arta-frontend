import React                from 'react';
import Plantdataline        from '../../components/Plant/Plantdataline';

const plantdataheader = (props) => {

    return (
        <ul key={props.i} className="plant-data-line plant-data-line__header" style={{overflow:'hidden'}}>
            <Plantdataline customClass="" data="" />
            <Plantdataline customClass="" data="Temperature" />
            <Plantdataline customClass="" data="Health" />
            <Plantdataline customClass="" data="Humidity" />
            <Plantdataline customClass="" data="Light hours" />
            <Plantdataline customClass="" data="Height" />
            <Plantdataline customClass="" data="Lux" />
            <Plantdataline customClass="" data="Ph" />
        </ul>
    )
}

export default plantdataheader;

