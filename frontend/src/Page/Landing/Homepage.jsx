import React from 'react'
import Banner from './Banner';

import AboutUs from './AboutUs'
import Collections from './Collections';
import Services from './Services'
import Corporate from './Corporate'
import HowTo from './HowTo'
import CarrerBranding from '../Career/CarrerBranding'
import Footer from '../../components/SingleComponent/Footer'

const Homepage = () => {
    return (
        <>
            <Banner />
            <AboutUs />
            <Collections />
            <Services />
            <Corporate />
            <HowTo />
            <CarrerBranding />
            <Footer />
        </>
    )
}

export default Homepage
