import React from 'react';
import './Display.css';

export default function(props) {
    return (
        <div className="Display">
            <span
                className="string"
                dangerouslySetInnerHTML= {
                    //Render as raw HTML
                    //&nbsp; is used to insert spaces between array items
                    {__html: props.displayString}
                }
            />
        </div>
    )
}