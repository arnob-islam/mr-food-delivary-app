import React from 'react'
import { Container } from '@mui/material'
import { Carousel, Col, Row } from 'antd';
import { RiEBike2Fill } from "react-icons/ri";
import { SiCakephp } from "react-icons/si";
import { GiRiceCooker, } from "react-icons/gi";
import { IoMdWine } from "react-icons/io";
import { FaHamburger, FaPizzaSlice, } from "react-icons/fa";
import { Box } from '@mui/system';
import SectionTitle from '../../components/SingleComponent/SectionTitle';

const Services = () => {

    const services = [
        {
            icon: <RiEBike2Fill />,
            title: "24/7 delevary",
            subtitle: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, omnis praesentium itaque et amet eligendi possimus quibusdam nobis illum error labore quas facilis animi, ipsa, ratione distinctio doloremque perspiciatis quisquam.',

            description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, omnis praesentium itaque et amet eligendi possimus quibusdam nobis illum error labore quas facilis animi, ipsa, ratione distinctio doloremque perspiciatis quisquam."
        },
        {
            icon: <SiCakephp />,
            title: "Delecious Food",
            subtitle: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, omnis praesentium itaque et amet eligendi possimus quibusdam nobis illum error labore quas facilis animi, ipsa, ratione distinctio doloremque perspiciatis quisquam.',
            description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, omnis praesentium itaque et amet eligendi possimus quibusdam nobis illum error labore quas facilis animi, ipsa, ratione distinctio doloremque perspiciatis quisquam."
        },
        {
            icon: <GiRiceCooker />,
            title: "Cuisine",
            subtitle: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, omnis praesentium itaque et amet eligendi possimus quibusdam nobis illum error labore quas facilis animi, ipsa, ratione distinctio doloremque perspiciatis quisquam.',
            description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, omnis praesentium itaque et amet eligendi possimus quibusdam nobis illum error labore quas facilis animi, ipsa, ratione distinctio doloremque perspiciatis quisquam."
        },
        {
            icon: <IoMdWine />,
            title: "Drinks",
            subtitle: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, omnis praesentium itaque et amet eligendi possimus quibusdam nobis illum error labore quas facilis animi, ipsa, ratione distinctio doloremque perspiciatis quisquam.',
            description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, omnis praesentium itaque et amet eligendi possimus quibusdam nobis illum error labore quas facilis animi, ipsa, ratione distinctio doloremque perspiciatis quisquam."
        },
        {
            icon: <FaPizzaSlice />,
            title: "Pizza",
            subtitle: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, omnis praesentium itaque et amet eligendi possimus quibusdam nobis illum error labore quas facilis animi, ipsa, ratione distinctio doloremque perspiciatis quisquam.',
            description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, omnis praesentium itaque et amet eligendi possimus quibusdam nobis illum error labore quas facilis animi, ipsa, ratione distinctio doloremque perspiciatis quisquam."
        },
        {
            icon: <FaHamburger />,
            title: "Burger",
            subtitle: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, omnis praesentium itaque et amet eligendi possimus quibusdam nobis illum error labore quas facilis animi, ipsa, ratione distinctio doloremque perspiciatis quisquam.',
            description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, omnis praesentium itaque et amet eligendi possimus quibusdam nobis illum error labore quas facilis animi, ipsa, ratione distinctio doloremque perspiciatis quisquam."
        },
    ]

    return (
        <section className='_SEC service_sector' >
            <Container>
                <SectionTitle title={'Services'} />

                <Carousel autoplay >
                    <Row gutter={16} justify="center"  >
                        {services.map((e, i) => {
                            return (i < 3 && <Col lg={8} md={12} xs={24} key={i} className='card_col' >
                                <Box className='card-body'>
                                    <Box className='services_front_card_body' >
                                        <div className='icon-box' >
                                            <h1>
                                                {e.icon}
                                            </h1>
                                        </div>
                                        <div className='servie_title' >
                                            <h1>
                                                {e.title}
                                            </h1>
                                        </div>
                                        <div className='service_subtitle' >
                                            <h5>
                                                {e.subtitle}
                                            </h5>
                                        </div>

                                    </Box>

                                </Box>
                            </Col>)
                        })}

                    </Row>
                    <Row gutter={16} justify="center" >
                        {services.map((e, i) => {
                            return (i >= 3 && <Col lg={8} md={12} xs={24} key={i} className='card_col' >
                                <Box className='card-body'>
                                    <Box className='services_front_card_body' >
                                        <div className='icon-box' >
                                            <h1>
                                                {e.icon}
                                            </h1>
                                        </div>
                                        <div className='servie_title' >
                                            <h1>
                                                {e.title}
                                            </h1>
                                        </div>
                                        <div className='service_subtitle' >
                                            <h5>
                                                {e.subtitle}
                                            </h5>
                                        </div>

                                    </Box>

                                </Box>
                            </Col>)
                        })}

                    </Row>
                </Carousel>

            </Container>
        </section>
    )
}

export default Services