import React from 'react'
import { Box, Container } from '@mui/material'
import { Typography } from 'antd';

const { Title, } = Typography;

const HowTo = () => {
    return (
        <section className='_SEC how_to'>
            <Container>
                <Box className='how_to_body' >
                    <Title level={2}>
                        Order food from the best restaurants and shops with Mr FoodRest
                    </Title>
                    <p >
                        Are you hungry? Did you have a long and stressful day? Interested in getting a cheesy pizza delivered to your office or looking to avoid the weekly shop? Then Mr FoodRest is the right destination for you! foodpanda offers you a long and detailed list of the best restaurants and shops near you to help make your everyday easier. Our online food delivery service has it all, whether you fancy a juicy burger from Takeout, fresh sushi from Samdado or peri peri chicken from Nando's, Mr FoodRest has over 2000 restaurants available  Did you know you can order your groceries and more from foodpanda, too? Check out foodpanda shops for favourite partners like Unimart, Suborno, Shwapno, Bengal Meat, and much more. Sit back and relax – let Mr FoodRest take the pressure off your shoulders.
                    </p>
                </Box>
            </Container>
        </section>
    )
}

export default HowTo