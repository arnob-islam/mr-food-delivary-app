import { Box } from "@mui/system";
import { Button, Col, Row, Rate, Tooltip } from "antd";
import React from "react";
import EmptyFood from "./EmptyFood";
import { useDispatch } from "react-redux";

const SingleFood = ({ foods }) => {
  const dispatch = useDispatch();

  const addToOrderList = (e) => {
    dispatch({ type: "ADD_TO_FOOD_ORDER", payload: e });
  };

  if (foods.length === 0) {
    return <EmptyFood />;
  }

  return (
    <Row gutter={[0, 24]}>
      {foods.map((e) => {
        const { foodName, price, recipe, star, subTitle, thumb, _id } = e;

        return (
          <Col className="single_food_col" key={_id} span={24}>
            <Box className="single_food_box flex">
              <div className="img_box_branding">
                <img src={thumb || "/image/default-food.png"} alt="" />
              </div>
              <div className="food-contents">
                <div className="food_heading_branding flex j-c-s-b">
                  <div className="title_branding">
                    <h6>{foodName}</h6>
                  </div>
                  <div className="add_to_order_button">
                    <Button
                      type="primary"
                      ghost
                      onClick={() =>
                        addToOrderList({ foodName, price, thumb, _id, qty: 1 })
                      }
                    >
                      Add +
                    </Button>
                  </div>
                </div>
                {subTitle && <div className="food-subtitle">{subTitle}</div>}
                <div className="food-star flex">
                  <div className="starts">
                    <Tooltip title={`${star} start`} color={"#2db7f5"}>
                      <div>
                        <Rate disabled allowHalf defaultValue={star} />
                      </div>
                    </Tooltip>
                  </div>
                  <div className="start_numbe">{star} votes</div>
                </div>
                <div className="food-price">
                  <span>${price}</span>
                </div>
                <div className="food_recipe">{recipe}</div>
              </div>
            </Box>
          </Col>
        );
      })}
    </Row>
  );
};

export default SingleFood;
