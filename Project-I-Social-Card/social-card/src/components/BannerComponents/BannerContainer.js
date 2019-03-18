import React from 'react';
import './Banner.css';

import BannerImage from './BannerImage';
import BannerInfo from './BannerInfo';

export default () => {
    return (
        <div class="banner">
            <BannerImage />
            <BannerInfo />
        </div>
    )
}