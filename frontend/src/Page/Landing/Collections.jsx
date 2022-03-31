import { Container } from '@mui/material'
import { Box } from '@mui/system'
import { Col, Row } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons';
import SectionBreadCrumb from '../../components/SingleComponent/SectionBreadCrumb'

const Collections = () => {

    const collections = [
        {
            title: `Burgers`,
            img: `image/c-1.jpg`,
            link: "burger"
        },
        {
            title: `lunch`,
            img: `image/c-2.jpg`,
            link: "lunch"
        },
        {
            title: `Hot Meal`,
            img: `image/c-3.jpg`,
            link: "meals"
        },
        {
            title: `snacks`,
            img: `image/c-4.jpg`,
            link: "snacks"
        },
    ]

    return (
        <section className='_SEC' >
            <Container>
                <SectionBreadCrumb title='Collections' subTitle={'Explore curated lists of top restaurants, cafes, pubs, and bars in Bengaluru, based on trends'} />
                <Row style={{ margin: "2rem 0" }} gutter={16} >
                    {collections.map((item, index) => {
                        return <Col lg={6} md={12} xs={12} key={index} className='gutter-row' >
                            <Box sx={{ position: "relative" }} >
                                <Link to={`/search?query=${item.link}`} className='collection_link_body' >
                                    <div className='img_wrapper' >
                                        <img src={item.img} alt="" />
                                    </div>
                                    <div className='collction_title' >
                                        <span className='collction_span' >
                                            {item.title} <ArrowRightOutlined className='collection_arrow' />
                                        </span>
                                    </div>
                                </Link>
                            </Box>
                        </Col>
                    })}
                </Row>
            </Container>
        </section>
    )
}

export default Collections