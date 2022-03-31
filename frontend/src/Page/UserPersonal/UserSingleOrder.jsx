import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Col, Row, Rate, Modal, message } from "antd";
import Typed from "react-typed";
import { useMutation } from "@apollo/client";
import { ORDER_NEW_RATE } from "../../Graphql/Mutations/Order";

const UserOrders = () => {
  const { id } = useParams();
  const { socket } = useSelector((state) => state.GlobalReducer);
  const { user } = useSelector((state) => state.UserReducer);

  const [singleOrder, setSingleOrder] = useState([true, {}]);
  const [statusImage, setstatusImage] = useState("");

  useEffect(() => {
    if (id && Object.keys(user).length !== 0) {
      socket.emit("MyOrderStatus", { foodId: id, userId: user._id });
    }
  }, [socket, id, user]);

  useEffect(() => {
    let subscribe = true;
    const CallBack = (payload) => {
      if (subscribe) setSingleOrder([false, payload]);
    };

    socket.on("orderStatus", CallBack);
    socket.on("orderStatusUpdated", CallBack);
    return () => {
      subscribe = false;
    };
  }, [socket]);

  useEffect(() => {
    const condition =
      Object.keys(singleOrder[1]).length === 0
        ? ""
        : singleOrder[1].orderStatus;

    if (condition === "pending") {
      setstatusImage("/image/pending.gif");
    }
    if (condition === "accept") {
      setstatusImage("/image/confirm.gif");
    }
    if (condition === "cooking") {
      setstatusImage("/image/cooking.gif");
    }
    if (condition === "way") {
      setstatusImage("/image/on-way.gif");
    }
    if (condition === "delivared") {
      setstatusImage("/image/success.gif");
    }
  }, [singleOrder]);

  const {
    shippingInfo,
    orderStatus,
    _id,
    foodItems,
    paymentBy,
    rated,
    delivered,
    userId,
  } = singleOrder[1];

  if (singleOrder[0]) {
    return <h1>Loading...</h1>;
  }

  const onlyFoodId = foodItems.map((e) => e.foodId);

  return (
    <>
      <section className="_SEC">
        <Container>
          <Row gutter={24}>
            <Col lg={12} md={12} xs={24}>
              <Box
                className="user_order_branding_body flex a-i-c j-c-c"
                sx={{ py: 3.5, px: 2 }}
              >
                <Box className="user_order_branding_box">
                  <Box className="heading_branding">
                    <h1>#{_id}</h1>
                  </Box>
                  <Box className="order_status_branding">
                    <h1>
                      {`Your order is  `}
                      <span>
                        <Typed loop strings={[orderStatus]} typeSpeed={400} />
                      </span>
                    </h1>
                  </Box>
                  <Box className="user_shipping_info">
                    <Box component={"ul"} className="shipping_ul">
                      <li>
                        <h1>{`Payment by ${paymentBy}`}</h1>
                      </li>
                      <h6>Shipping & Contact information</h6>
                      <li>
                        <b>{shippingInfo.tel}</b>
                      </li>
                      <li>
                        {shippingInfo.street}, {shippingInfo.area}
                      </li>
                      <li>{shippingInfo.note}</li>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Col>
            <Col lg={12} md={12} xs={24}>
              <Box className="user_order_status_box" sx={{ p: 1 }}>
                <Box className="order_status_image">
                  <img src={statusImage} alt="" />
                </Box>
              </Box>
            </Col>
          </Row>
        </Container>
      </section>
      <UserSingOrderSummery foodItems={foodItems} />
      <AfterDelivered data={{ rated, delivered, userId, _id, onlyFoodId }} />
    </>
  );
};

const UserSingOrderSummery = ({ foodItems }) => {
  return (
    <section className="_SEC">
      <Container maxWidth="md">
        <Box className="user_single_order_summery">
          <h1>Your order summery</h1>
        </Box>
        <Row>
          <Col lg={24} md={24} xs={24}>
            <Box className="single_order_summery">
              <Box component={"ul"}>
                {foodItems.map((e) => {
                  return (
                    <li className="flex a-i-c " key={e._id}>
                      <Box className="single_order_thumb">
                        <img src={e.thumb} alt="" />
                      </Box>
                      <Box className="single_order_info">
                        <h1>
                          {e.foodName} {"  "} <span>x</span> {"  "}
                          <span>{e.qty}</span>
                        </h1>
                      </Box>
                      <Box className="single_order_price">
                        <h1>${e.price}</h1>
                      </Box>
                    </li>
                  );
                })}
              </Box>
            </Box>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const AfterDelivered = ({ data }) => {
  const { rated, delivered, userId, onlyFoodId, _id } = data;

  const [isModalVisible, setIsModalVisible] = useState([false, 5]);

  const [GiveTheRating, { loading, data: updateData }] =
    useMutation(ORDER_NEW_RATE);

  useEffect(() => {
    if (!rated && delivered) {
      setTimeout(() => {
        setIsModalVisible([true, 5]);
      }, 2000);
    }
  }, [rated, delivered]);

  useEffect(() => {
    if (updateData) {
      if (updateData.updateUserOrder.success) {
        setIsModalVisible([false, 5]);
      }
      if (!updateData.updateUserOrder.success) {
        setIsModalVisible([false, 5]);
        message.error("Something is error! try again later");
      }
    }
  }, [updateData]);

  const HandleOk = (e) => {
    if (isModalVisible[1] === 0) {
      message.warning("You can't rate 0 star");
      return;
    }
    GiveTheRating({
      variables: {
        id: onlyFoodId,
        userId,
        star: isModalVisible[1],
        orderId: _id,
      },
    });
  };

  const HandleRateChange = (e) => {
    setIsModalVisible((pre) => {
      return [true, e];
    });
  };

  return (
    <>
      <Modal
        title="Rate our food"
        visible={isModalVisible[0]}
        onOk={HandleOk}
        onCancel={() => setIsModalVisible([false])}
        confirmLoading={loading}
      >
        <Box className="flex a-i-c" sx={{ gap: 2 }}>
          <Box>
            <Rate allowHalf defaultValue={5} onChange={HandleRateChange} />
          </Box>
          <Box className="user_rate_count">
            <h4>{isModalVisible[1]}</h4>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UserOrders;
