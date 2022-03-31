import React from 'react'
import SearchQuery from './SearchQuery'
import { useLazyQuery } from "@apollo/client";
import { DISPLAY_SEARCH_FOODS } from '../../Graphql/Query/PublicFood';
import { useEffect } from 'react';
import FoodLoading from '../../components/SingleComponent/FoodLoading'
import SingleFood from './SingleFood';


const DisplayFood = () => {

    const { exectSearch } = SearchQuery()

    const [loadGreeting, { loading, data }] = useLazyQuery(DISPLAY_SEARCH_FOODS);

    useEffect(() => {
        loadGreeting({
            variables: {
                search: exectSearch
            }
        })
    }, [loadGreeting, exectSearch])



    return (
        <div className='_SEC_2' >
            {loading ?

                <FoodLoading amount={5} />
                :
                <SingleFood foods={data ? data.searcDisplayhFoods.foods : []} />}

        </div>
    )
}

export default DisplayFood