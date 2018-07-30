import React, {Component} from 'react';

class PlantdataFormItem extends Component {
    
    
    state = {
        data: this.props.data
    };
    

    render() {

        let rootClasses = ["single-plant__data"];
        rootClasses.push("single-plant__data-" + this.props.customClass);
    
        let h3Class = ["single-plant__data-label"];
        h3Class.push("single-plant__data-label-" + this.props.customClass);
    
        let pClass = ["single-plant__data-point"];
        pClass.push("single-plant__data-point-" + this.props.customClass);
    
        const stateKey = this.props.label.toLowerCase().replace(' ', '_');
        return (
            <div className={rootClasses.join(" ")}>
                <h3 className={h3Class.join(" ")}>{this.props.label}</h3>
                <input type="text" className={pClass.join(" ")} value={this.props.data} onChange={ e => {
                    const value = e.target.value;
                    this.setState({data: value}, () => {
                        const data = {};
                        data[stateKey] = value;
                        this.props.change( data )
                    });
                }}></input>
            </div>
        );
    }
}


export default PlantdataFormItem;