import React from 'react';
import './Button.css';

export default function(props) {
    return (
        <button
            className={ props.className + " ActionButton" }
            onClick={
                (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    event.nativeEvent.stopImmediatePropagation();
                    props.buttonClickHandler()
                }
            }>
            { props.operation }
        </button>
    )
}