import { Container } from '@mui/material'
import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import { Box } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import SearchFood from '../../components/SingleComponent/SearchFood';
import { Carousel as ACarosel, } from 'antd';


// eslint-disable-next-line no-unused-vars
const HomeBanner = () => {

    const BannerContent = [
        {
            subTitle: `Welcome to`,
            title: `Our restaurant`,
            img: `image/banner-1.jpg`
        },
        {
            subTitle: `Choose food`,
            title: `And order`,
            img: `image/banner-2.jpg`
        },

    ]

    return (
        <section className='home_banner'>
            <Carousel showThumbs={false} showArrows={true} showStatus={false} infiniteLoop={false} showIndicators={false} >
                {BannerContent.map((e, i) => {
                    return <Container maxWidth="xlg" sx={{ position: "relative" }} style={{ padding: 0 }} key={i} className='full_banner_wrapper' >
                        <div>
                            <img src={e.img} alt="" />
                        </div>
                        <Container maxWidth='lg' className='flex a-i-c j-c-c banner_content_wrapper'  >
                            <Box className='alawfas'>
                                <h4>
                                    {e.subTitle}
                                </h4>
                            </Box>
                            <Box className='aw3etr3s'>
                                <h1>
                                    {e.title}
                                </h1>
                            </Box>
                            <Box className='search_box' >

                                <SearchFood />
                            </Box>
                        </Container>

                    </Container>
                }
                )}
            </Carousel>

        </section>
    )
}


const Banner = () => {

    const BannerContent = [
        {
            subTitle: `Welcome to`,
            title: `Our restaurant`,
            img: `image/banner-1.jpg`
        },
        {
            subTitle: `Choose food`,
            title: `And order`,
            img: `image/banner-2.jpg`
        },

    ]
    return <ACarosel dotPosition={"left"} autoplay >

        {BannerContent.map((e, i) => {
            return <section style={{ background: `url(${e.img})` }} className='banner_crosoel_sec f-b' key={i} >

                <Box sx={{ background: `url(${e.img})` }}
                    key={i} className='full_banner_wrapper f-b' >
                    {/* <div>
                            <img src={e.img} alt="" />
                        </div> */}
                    <Container maxWidth='lg' className='flex a-i-c j-c-c banner_content_wrapper f-b'  >
                        <Box className='alawfas'>
                            <h4>
                                {e.subTitle}
                            </h4>
                        </Box>
                        <Box className='aw3etr3s'>
                            <h1>
                                {e.title}
                            </h1>
                        </Box>
                        <Box className='search_box' >

                            <SearchFood />
                        </Box>
                    </Container>

                </Box>
            </section>
        }
        )}

    </ACarosel>
}


export default Banner
