import React from 'react';
import './Banner.css';
import banner from './react.png';

export default () => {
    return (
        <div className="banner-image-container">
            <img className="banner-image" src={banner} />
        </div>
    )
}