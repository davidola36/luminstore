import React from 'react';

const ModalBody = (props) => {
    return (
        <div className="modal">
            <div className="modal--background" onClick={props.dismiss}></div>
            {props.children}
        </div>       
    )
}

export default ModalBody