import React from "react";
import { Avatar, Dropdown, Menu, Modal, Row } from "antd";
import { Box } from "@mui/material";
import { FaTimesCircle } from "react-icons/fa";
import { GiCampCookingPot, GiConfirmed } from "react-icons/gi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosBicycle } from "react-icons/io";
import { MdOutlinePlace } from "react-icons/md";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const SingleOrder = ({ data, UpdateStatus }) => {
  function SingleOrderMoreDetails({ shippingInfo, foodItems, _id }) {
    Modal.info({
      title: `Order details`,
      centered: true,
      content: (
        <Box className="more_details_box flex" sx={{ gap: 2 }}>
          <Box className="more_shippingInfo">
            <Box component={"ul"} className="more_shipping_ul">
              <li>
                <h5>#{_id}</h5>
              </li>
              <li>
                {" "}
                <b>
                  {" "}
                  <i> {shippingInfo.tel} </i>{" "}
                </b>{" "}
              </li>
              <li>
                <i>
                  {" "}
                  {shippingInfo.street}, {shippingInfo.area}
                </i>
              </li>
              <li>
                <b>{shippingInfo.note}</b>
              </li>
            </Box>
          </Box>
          <Box className="more_food_item">
            <Box className="more_order_name" component={"ul"}>
              {foodItems.map((e, i) => (
                <li key={e._id}>
                  <span>
                    <b>
                      {" "}
                      {e.foodName} <span>x</span> <span>{e.qty}</span>{" "}
                    </b>
                  </span>
                </li>
              ))}
            </Box>
          </Box>
        </Box>
      ),
      onOk() {},
      className: "single_order_more_details_model",
    });
  }

  function ConfirmReject(id) {
    Modal.confirm({
      title: "Are you sure",
      icon: <ExclamationCircleOutlined />,
      content: "You went to reject the order",
      okText: "Delete",
      cancelText: "Cancle",
      onOk: () => UpdateStatus("reject", id),
    });
  }

  const OrderStatusCalculation = ({ status, id }) => {
    if (status === "way") {
      return (
        <Menu.Item
          key="1"
          icon={<MdOutlinePlace />}
          onClick={() => UpdateStatus("delivared", id)}
        >
          Order placed
        </Menu.Item>
      );
    } else if (status === "cooking") {
      return (
        <Menu.Item
          key="2"
          icon={<IoIosBicycle />}
          onClick={() => UpdateStatus("way", id)}
        >
          On way
        </Menu.Item>
      );
    } else if (status === "accept") {
      return (
        <Menu.Item
          key="3"
          icon={<GiCampCookingPot />}
          onClick={() => UpdateStatus("cooking", id)}
        >
          Cooking
        </Menu.Item>
      );
    }
    return (
      <Menu.ItemGroup key="8">
        <Menu.Item
          key="4"
          icon={<GiConfirmed />}
          onClick={() => UpdateStatus("accept", id)}
        >
          Accept
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<FaTimesCircle />}
          onClick={() => ConfirmReject(id)}
        >
          Reject
        </Menu.Item>
      </Menu.ItemGroup>
    );
  };

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

  return (
    <>
      <Box className="order_heading">
        <h1>Recent orders</h1>
      </Box>
      <Row
        style={{
          width: "100%",
          background: "white",
          borderRadius: " 1rem",
          padding: "1rem 0",
        }}
        className="flex j-c-c"
      >
        <Box className="recent_order_wrapper">
          <Box component={"ul"} className="recent_order_ul">
            {data.map((e) => {
              const { orderStatus, foodItems, shippingInfo, _id } = e;
              return (
                <li key={_id} className="recent_order_li">
                  <Box className="order_box_body flex" sx={{ gap: 2 }}>
                    <Box className="img_container">
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
                                  width: "65px",
                                  height: "65px",
                                  borderRadius: "15%",
                                }}
                              />
                            </React.Fragment>
                          );
                        })}
                      </Avatar.Group>
                    </Box>
                    <Box
                      className="order_item_branding"
                      sx={{ minWidth: "140px" }}
                    >
                      <Box className="order_name" component={"ul"}>
                        {foodItems
                          .map((e, i) => (
                            <li key={e._id}>
                              <h1>
                                {e.foodName.substring(0, 15)} <span>x</span>{" "}
                                <span>{e.qty}</span>{" "}
                                <span>{i > 2 && "....."}</span>
                              </h1>
                            </li>
                          ))
                          .slice(0, 3)}
                      </Box>
                    </Box>
                    <Box
                      className="shipping_info"
                      onClick={() =>
                        SingleOrderMoreDetails({ shippingInfo, foodItems, _id })
                      }
                    >
                      <Box component={"ul"} className="shipping_ul">
                        <li>
                          <h1># {_id}</h1>
                        </li>
                        <li>{shippingInfo.tel}</li>
                        <li>
                          {shippingInfo.street}, {shippingInfo.area}
                        </li>
                      </Box>
                    </Box>
                    <Box
                      className="order_total_price flex a-i-c"
                      sx={{ mx: 2, minWidth: "62px" }}
                    >
                      <h1>
                        ${" "}
                        {foodItems.reduce((acc, e) => acc + e.qty * e.price, 0)}
                      </h1>
                    </Box>
                    <Box
                      className="order_status flex a-i-c"
                      sx={{ minWidth: "64px" }}
                    >
                      <div
                        className="order_status_box"
                        style={{
                          backgroundColor: OrderStatusColor(orderStatus),
                        }}
                      >
                        <h1>{orderStatus}</h1>
                      </div>
                    </Box>
                    <Box className="flex a-i-c">
                      <div className="single_order_update_option">
                        <Dropdown.Button
                          overlay={
                            <Menu
                              style={{ width: "9.5rem" }}
                              className="order_options"
                            >
                              <OrderStatusCalculation
                                status={orderStatus}
                                id={_id}
                              />
                            </Menu>
                          }
                          icon={<BsThreeDotsVertical />}
                          trigger={["click"]}
                          type="link"
                          className="recent-order-three-dot"
                        />
                      </div>
                    </Box>
                  </Box>
                </li>
              );
            })}
          </Box>
        </Box>
      </Row>
    </>
  );
};

export default SingleOrder;
