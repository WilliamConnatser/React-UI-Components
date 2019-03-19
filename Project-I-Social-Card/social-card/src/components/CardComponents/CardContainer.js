import React from 'react';
import './Card.css';

import ImageThumbnail from './ImageThumbnail';
import CardContent from './CardContent';

export default () => {
    return (
        <div className="card">
            <ImageThumbnail />            
            <CardContent />
        </div>
    )
}