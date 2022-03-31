import React from "react";
import { Row, Avatar, Tooltip } from "antd";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import EmptyFood from "../DisplayFood/EmptyFood";

const ViewOrder = ({ data }) => {
  const OrderStatusColor = (status) => {
    if (status === "accept") {
      return "rgb(46 249 127)";
    }
    if (status === "pending") {
      return "#f9d212";
    }
    if (status === "way") {
      return "#f92ec4";
    }
    if (status === "cooking") {
      return `rgb(229 82 82 / 72%)`;
    }
    return "rgb(51 199 158)";
  };

  if (data.length === 0) {
    return <EmptyFood line={"Sorry you didn't order any Food yet"} />;
  }
  return (
    <Row>
      <Box className="user_active_order" sx={{ width: "100%" }}>
        <Box component={"ul"} className=" user_active_order_ul">
          {data.map((e) => {
            const { orderStatus, foodItems, shippingInfo, _id } = e;
            return (
              <li key={_id} className="user_order_li">
                <Link to={`/order/status/${_id}`} className="user_navLink">
                  <Box
                    className="user_order_box flex a-i-c j-c-s-b"
                    sx={{ gap: 2 }}
                  >
                    <Box className="user_order_img_container">
                      <Avatar.Group
                        maxCount={2}
                        size="large"
                        maxStyle={{
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                        }}
                      >
                        {foodItems.map((e) => {
                          return (
                            <React.Fragment key={e._id}>
                              <Avatar
                                src={e.thumb}
                                style={{
                                  width: "75px",
                                  height: "75px",
                                  borderRadius: "15%",
                                }}
                              />
                            </React.Fragment>
                          );
                        })}
                      </Avatar.Group>
                    </Box>

                    <Box
                      className="shipping_info user_shipping_info"
                      sx={{ display: { md: "block", xs: "none", lg: "block" } }}
                    >
                      <Box component={"ul"} className="shipping_ul">
                        <li>
                          <h3>#{_id}</h3>
                        </li>
                        <li>{shippingInfo.tel}</li>
                        <li>
                          {shippingInfo.street}, {shippingInfo.area}
                        </li>
                      </Box>
                    </Box>
                    <Box
                      className="user_order_no_mobile"
                      sx={{ display: { md: "none", xs: "block", lg: "none" } }}
                    >
                      <Box className="mobile_user_order_number flex a-i-c j-c-c">
                        <Tooltip title={_id}>
                          <h3>
                            #{"... " + _id.substr(_id.length - 10, _id.length)}
                          </h3>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Box
                      className="order_total_price flex a-i-c"
                      sx={{ mx: 2 }}
                    >
                      <h1>
                        ${" "}
                        {foodItems.reduce((acc, e) => acc + e.qty * e.price, 0)}
                      </h1>
                    </Box>
                    <Box className="order_status flex a-i-c">
                      <div
                        className="order_status_box"
                        style={{
                          backgroundColor: OrderStatusColor(orderStatus),
                        }}
                      >
                        <h3>{orderStatus}</h3>
                      </div>
                    </Box>
                  </Box>
                </Link>
              </li>
            );
          })}
        </Box>
      </Box>
    </Row>
  );
};

export default ViewOrder;
