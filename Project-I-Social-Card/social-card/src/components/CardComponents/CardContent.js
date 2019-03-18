import React from 'react';
import './Card.css';

import HeaderContainer from '../HeaderComponents/HeaderContainer';
import BannerContainer from '../BannerComponents/BannerContainer';
import Footer from '../FooterComponents/Footer';

export default () => {
    return (
        <div className="card-content">
            <HeaderContainer />
            <div className="card-content-text">
                Let's learn React by building simple interfaces with components. Don't try to overthink it, just keep it simple and have fun. Once you feel comfortable using components, you are well on your way to mastering React!
            </div>
            <BannerContainer />
            <Footer />
        </div>
    )
}