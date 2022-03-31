import React from 'react'
import { Container } from '@mui/material'
import SectionBreadCrumb from '../../components/SingleComponent/SectionBreadCrumb'
import { Box } from '@mui/system'
import { Button, Col, Row } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const Corporate = () => {
    return (
        <section className='_SEC' >
            <Container>
                <SectionBreadCrumb title='Take your office out to lunch' />
            </Container>
            <Container maxWidth='xl' sx={{ background: `url(/image/bg-1.jpg)`, height: `60vh`, backgroundAttachment: 'fixed', backgroundRepeat: "no-repeat !important", backgroundSize: "cover!important" }} className='corportate_container' >
                <Row>
                    <Col lg={8} md={12} xs={24} >
                        <Box className='corporate_box_body'>
                            <div className="branding">
                                <h1>
                                    Hungry ? Order now
                                </h1>
                                <p>
                                    Order lunch or fuel for work-from-home, late nights in the office, corporate events, client meetings, and much more.
                                </p>
                            </div>
                            <div className="search_button">
                                <Button type="primary" icon={<SearchOutlined />} size='large' onClick={() =>
                                    window.scrollTo({
                                        left: 0,
                                        top: 0,
                                    })} >
                                    Search
                                </Button>

                            </div>
                        </Box>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Corporate