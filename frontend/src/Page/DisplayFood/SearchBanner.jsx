import React from 'react'
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import SearchQuery from './SearchQuery'
import { Box, Container } from '@mui/material'


const TopBreadCrum = () => {

    const { exectSearch } = SearchQuery()


    return <div className='search_breadcrum'>
        <Breadcrumb>
            <Breadcrumb.Item >
                <Link to={'/'} >
                    Home
                </Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
                <span>search</span>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
                {exectSearch}
            </Breadcrumb.Item>
        </Breadcrumb>
    </div>
}

const SearchBanner = () => {

    const imageContainer = [
        "/image/display-1.jpg",
        "/image/display-2.jpg",
        "/image/display-3.jpg",
        "/image/display-4.jpg",
        "/image/display-5.jpg",
    ]

    const randomInt = () => Math.floor(Math.random() * imageContainer.length)

    return (
        <section>
            <Container>
                <TopBreadCrum />
                <Box className='search_banner_box' >
                    <img src={imageContainer[randomInt()]} className='search_banner_image' alt="" />
                </Box>
            </Container>
        </section>
    )
}

export default SearchBanner