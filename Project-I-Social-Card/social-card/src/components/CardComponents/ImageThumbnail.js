import React from 'react';
import './Card.css';
import logo from './lambda-logo.png';

export default () => {
    return (
        <div className="card-thumbnail">
            <img src={ logo } />
        </div>
    )
}