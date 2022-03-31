import { Box, Container } from '@mui/material'
import { Row } from 'antd';
import React from 'react'

const CarrerBranding = ({ title }) => {
    return (
        <footer className='footer_' >
            <Container>
                <Row className='footer_row' justify='space-between' align='center' >
                    <Box>
                        <div className="footer_head_title">
                            <h1>
                                {title ? title : 'Hunger smart soluation'}
                            </h1>
                        </div>
                    </Box>

                    <Box className='footer_image_branding' >
                        <div className="footer_title">
                            Mr FoodRest
                        </div>
                        <div className="logo_">
                            <img src="/logo.png" alt="logo" />
                        </div>

                    </Box>

                </Row>
                <Row className='footer_copyright' justify='center' align='center' >
                    <Box>
                        <p>
                            Copyright © 2022 All Rights Reserved by Mr FoodRest.
                        </p>
                    </Box>
                </Row>
            </Container>
        </footer>
    )
}

export default CarrerBranding