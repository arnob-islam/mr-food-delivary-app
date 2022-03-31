import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react'

const FoodLoading = ({ amount }) => {

    const [loadingAmount, setLoadingAmount] = useState([
        "a", "b", "c", "d", "e", "f",
        "a", "b", "c", "d", "e", "f",
        "a", "b", "c", "d", "e", "f",
    ])


    useEffect(() => {
        if (amount) {
            setLoadingAmount(prev => prev.slice(0, amount))
        } else {
            setLoadingAmount(prev => prev.slice(0, 1))
        }
    }, [amount])


    return (

        <Box className='flex' sx={{ gap: 2, flexDirection: "column" }} >
            {loadingAmount.map((e, i) => {

                return <div className='loading_box flex' key={i} >
                    <div className="image_loading">
                        <Skeleton variant="rectangular" width={150} height={90} />
                    </div>

                    <div className="loading_content ">
                        <div className="loading_head flex j-c-s-b">
                            <Skeleton animation="pulse" sx={{ width: { md: '70%', xs: '85%' } }} height={35} />
                            <Skeleton animation="pulse" sx={{ width: { md: '20%', xs: '10%' } }} height={35} />
                        </div>
                        <div className="cotents_load">
                            <Skeleton animation="pulse" sx={{ width: { md: '50%', xs: '100%' } }} height={30} />
                            <Skeleton animation="pulse" sx={{ width: { md: '60%', xs: '90%' } }} height={30} />
                        </div>
                    </div>

                </div>
            })}
        </Box>
    )
}

export default FoodLoading