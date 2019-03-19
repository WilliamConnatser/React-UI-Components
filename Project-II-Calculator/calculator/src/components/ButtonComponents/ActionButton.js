import React from 'react';
import './Button.css';

export default function(props) {
    return (
        <button
            className={ props.className + " ActionButton" }
            onClick={props.buttonClickHandler}>
            { props.operation }
        </button>
    )
}