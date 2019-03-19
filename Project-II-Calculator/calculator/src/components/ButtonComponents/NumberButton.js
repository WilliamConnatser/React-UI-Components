import React from 'react';
import './Button.css';

export default function(props) {
    return (
        <button
            className={ props.className + " NumberButton" }
            onClick={
                (event) => {
                    event.nativeEvent.stopImmediatePropagation();
                    props.buttonClickHandler()
                }
            }>
            { props.number }
        </button>
    )
}