import React, { useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_DISPLAY_FOODS } from '../../Graphql/Query/PublicFood';
import { Link } from 'react-router-dom';



const searchResult = (food, query) => {


    const produchSercth = () => {
        return food.filter(e => {
            const regex = new RegExp(query, 'gi')
            // var wordInLine = "";
            // e.keywords.map(e => wordInLine = wordInLine + " " + e)
            return e.catagory.match(regex)
        })
    }

    return produchSercth().map((item, idx) => {
        const category = `${item.catagory}`;

        return {
            value: item.catagory,
            label: (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <span>
                        <Link to={`/search?query=${category}`} >
                            {category}
                        </Link>
                    </span>

                </div>
            ),
        };
    });
}




const SearchFood = () => {

    const [options, setOptions] = useState([]);
    const { data } = useQuery(GET_DISPLAY_FOODS)

    const handleSearch = (value) => {
        setOptions(value ? searchResult(data ? data.displayFoods.foods : [], value) : []);
    };


    return (
        <AutoComplete
            dropdownMatchSelectWidth={252}
            style={{
                width: 350,
            }}
            options={options}
            onSearch={handleSearch}
        >
            <Input.Search size="large" placeholder="e.g burger" />
        </AutoComplete>
    );
};

export default SearchFood