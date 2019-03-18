import React from 'react';
import './Banner.css';

import BannerTitle from './BannerTitle';
import BannerDescription from './BannerDescription';
import BannerLink from './BannerLink';

export default () => {
    return (
        <div className="banner-info">
            <BannerTitle />
            <BannerDescription />
            <BannerLink />
        </div>
    )
}