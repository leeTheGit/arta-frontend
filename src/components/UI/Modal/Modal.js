import React, {Component} from 'react';

import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.children);
        console.log(this.props.children);
        console.log(nextProps.children !== this.props.children);
        
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log('Modal is updating')
    }

    render() {
        const classModifier = this.props.class_modifier || '';

        return (
            <Aux>
                <Backdrop show={this.props.show} click={this.props.remove}/>
                {/* <div className="modal" */}
                <div className={"modal " + classModifier}
                style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
        
                >
                    {this.props.children}
                </div>
            </Aux>
    
        )
    }
}

export default Modal;