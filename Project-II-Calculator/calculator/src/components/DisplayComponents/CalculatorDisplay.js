import React from 'react';
import './Display.css';

export default function(props) {
    return (
        <div className="Display">
            <span className="string">{ props.displayString }</span>
        </div>
    )
}