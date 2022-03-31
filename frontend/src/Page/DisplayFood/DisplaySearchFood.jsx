import React from 'react'
import { Container } from '@mui/material'
import SectionBreadCrumb from '../../components/SingleComponent/SectionBreadCrumb';
import SearchQuery from './SearchQuery';
import FoodDrawer from './FoodDrawer'
import DisplayFood from './DisplayFood'

const SearchResult = () => {
    const { exectSearch } = SearchQuery()
    return (
        <section className='_SEC_2' >
            <Container>
                <SectionBreadCrumb title={`Looking for "${exectSearch}"`} subTitle='Maybe something interesting' />
                <FoodDrawer />
                <DisplayFood />
            </Container>
        </section>
    )
}

export default SearchResult