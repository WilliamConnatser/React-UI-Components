import React from 'react';
import './Header.css';

import HeaderTitle from './HeaderTitle';
import HeaderContent from './HeaderContent';

export default () => {
    return (
        <div className="header">
            <HeaderTitle />
            <HeaderContent />
        </div>
    )
}