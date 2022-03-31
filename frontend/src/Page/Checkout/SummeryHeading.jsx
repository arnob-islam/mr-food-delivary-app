
const SummeryHeading = ({ number, title }) => {
    return <div className="order_summery_heading flex">
        <div className="number_heading_box">
            <h3>
                {number}
            </h3>
        </div>
        <div className="title_heading">
            <h3>
                {title}
            </h3>
        </div>
    </div>
}

export default SummeryHeading