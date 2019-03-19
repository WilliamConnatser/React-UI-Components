import React from 'react';
import './Button.css';

export default function(props) {
    return (
        <div className={ props.className + " ActionButton" }>
            { props.operation }
        </div>
    )
}