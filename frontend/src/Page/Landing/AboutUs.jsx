import React from 'react'
import { Box, Container } from '@mui/material'
import { Col, Row } from 'antd'
import SectionTitle from '../../components/SingleComponent/SectionTitle'

const AboutUs = () => {
    return (
        <section className='_SEC' >
            <Container>
                <SectionTitle title={'About Us'} />
                <Row>
                    <Col lg={12} md={18} xs={24}>
                        <Box className='about_us_branding'>
                            <h2>
                                Who we are
                            </h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore ex maiores laudantium dolorem suscipit optio. Facilis quod accusantium enim, sequi consequatur mollitia aspernatur voluptates minima, earum, labore animi est sunt.
                            </p>
                        </Box>
                    </Col>
                    <Col lg={12} md={18} xs={24}>
                        <Box className='about_us_branding image_branding'>
                            <Box maxWidth={"50%"} className='about_image' >
                                <img src="image/food-1.jpg" alt="about us" />
                            </Box>
                            <Box maxWidth={"50%"} className='about_image' >
                                <img src="image/food-2.jpg" alt="about us" />
                            </Box>
                        </Box>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default AboutUs