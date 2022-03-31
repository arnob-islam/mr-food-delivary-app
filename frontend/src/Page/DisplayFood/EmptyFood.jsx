import { Empty } from 'antd';
import SearchQuery from './SearchQuery';

const EmptyFood = ({ line }) => {
    const { exectSearch } = SearchQuery()

    return <Empty description={line ? line : `Sorry Nothing found "${exectSearch}"`} style={{ color: "white", fontSize: "1.49rem", padding: "4rem 0" }} />
}
export default EmptyFood