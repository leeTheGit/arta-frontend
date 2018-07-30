import React                from 'react';
import Plantdataline        from '../../components/Plant/Plantdataline';

const plantdataheader = (props) => {

    return (
        <ul key={props.i} className="plant-data-line plant-data-line__header" style={{overflow:'hidden'}}>
            <Plantdataline customClass="" data="" />
            <Plantdataline customClass="" data="Temp" />
            <Plantdataline customClass="" data="He" />
            <Plantdataline customClass="" data="Hu" />
            <Plantdataline customClass="" data="Li Hrs" />
            <Plantdataline customClass="" data="Hei" />
            <Plantdataline customClass="" data="Lux" />
            <Plantdataline customClass="" data="Ph" />
            <Plantdataline customClass="" data="" />
        </ul>
    )
}

export default plantdataheader;

