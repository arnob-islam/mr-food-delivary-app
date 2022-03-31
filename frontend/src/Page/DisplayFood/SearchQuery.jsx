
import { useLocation } from 'react-router-dom'

const SearchQuery = () => {
    const { search } = useLocation()
    const exectSearch = search.split("=")[1]

    return { exectSearch }
}

export default SearchQuery