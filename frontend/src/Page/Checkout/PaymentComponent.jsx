/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { Box } from "@mui/material";
import { message, Button, Radio, Tooltip, Spin } from "antd";
import SummeryHeading from "./SummeryHeading";
import { CLIENT_SECRET, ORDER_FOOD } from "./../../Graphql/Mutations/Order";

let stripePromise = loadStripe(process.env.REACT_APP_STIPE_PUBLISHABLE_KEY);

const useOptions = () => {
  const fontSize = "16px";

  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#ffffff",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const PaymentComponent = () => {
  const [value, setValue] = React.useState(0);

  const onChange = (e) => setValue(e.target.value);

  return (
    <Box className="payment_box">
      <SummeryHeading number={2} title={"Personal information"} />

      <Box className="payment_body" sx={{ mt: 3 }}>
        <Radio.Group
          onChange={onChange}
          value={value}
          style={{ width: "100%" }}
        >
          <Box className="select_box" sx={{ p: 2 }}>
            <div className="radio_button">
              <Radio value={1}> cradit card </Radio>

              {value === 1 && (
                <Box className="payment_toogle_box">
                  <Elements stripe={stripePromise}>
                    <PaymentForm />
                  </Elements>
                </Box>
              )}
            </div>
          </Box>

          <Box className="select_box" sx={{ p: 2, mt: 1.8 }}>
            <div className="radio_button">
              <Tooltip title="cash on delivery option is currently off">
                <Radio value={2} defaultChecked={false} disabled={true}>
                  Cash on Delivery
                </Radio>
              </Tooltip>
            </div>
          </Box>
        </Radio.Group>
      </Box>
      <Box className="place_order_button" sx={{ mt: 4 }}>
        <Button type="primary" block disabled>
          Place Order
        </Button>
      </Box>
    </Box>
  );
};

const PaymentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [GetClientSecret, { data, loading }] = useMutation(CLIENT_SECRET);

  const [OrderTheFood, { data: orderData, loading: orderLading }] =
    useMutation(ORDER_FOOD);

  const { user } = useSelector((state) => state.UserReducer);

  const { userAddress, userInformation, orderList } = useSelector(
    (state) => state.FoodOrderReducer
  );

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [userPaymentMethod, setPaymentMethod] = useState({});

  const [payButtonDisable, setPayButtonDisable] = useState(false);

  useEffect(() => {
    const getFoodItems = () => {
      return orderList.length !== 0
        ? orderList
        : JSON.parse(sessionStorage.getItem("orderItem"));
    };
    if (data) {
      stripe
        .confirmCardPayment(data.paymentSecret.message, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: `${userInformation.firstName} ${userInformation.lastName}`,
              email: userInformation.email,
            },
          },
        })
        .then((result) => {
          OrderTheFood({
            variables: {
              orderFoodInput: {
                foodItems: getFoodItems().map((e) => {
                  const { qty, price } = e;
                  return {
                    foodId: e._id,
                    qty,
                    price,
                  };
                }),
                userId: user._id,
                paymentInfo: {
                  complete: true,
                  card: {
                    brand: userPaymentMethod.card.brand,
                    funding: userPaymentMethod.card.funding,
                    client_secret: result.paymentIntent.client_secret,
                    id: result.paymentIntent.id,
                  },
                },
                shippingInfo: {
                  area: userAddress.area,
                  street: userAddress.street,
                  note: userAddress.note,
                  tel: userInformation.tel,
                },
              },
            },
          });
        })
        .catch((err) => {
          message.error("We are unable to authenticate your payment method");
          setPayButtonDisable(false);
        });
    }
  }, [
    data,
    stripe,
    elements,
    userInformation,
    OrderTheFood,
    user,
    userPaymentMethod,
    userAddress,
    orderList,
  ]);

  useEffect(() => {
    if (orderData) {
      if (orderData.orderFood.success) {
        sessionStorage.removeItem("orderItem");
        dispatch({ type: "PAYMENT_COMPLETE" });
        navigate(`/order/status/${orderData.orderFood.message}`);
      }
    }
  }, [orderData, navigate, dispatch]);

  const submitHandelar = async (event) => {
    event.preventDefault();

    try {
      if (!stripe || !elements) {
        return;
      }

      if (
        Object.keys(userAddress).length === 0 &&
        Object.keys(userInformation).length === 0
      ) {
        message.error("Please fill your all input");
        return;
      }
      const OrderdFood =
        orderList.length !== 0
          ? orderList
          : JSON.parse(sessionStorage.getItem("orderItem"));

      setPayButtonDisable(true);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
      });

      if (error) {
        message.error(error.message);
        setPayButtonDisable(false);
        return;
      }

      GetClientSecret({
        variables: {
          amount: OrderdFood.reduce((acc, e) => acc + e.qty * e.price, 0),
        },
      });
      setPaymentMethod(paymentMethod);
    } catch (err) {
      message.error(err.message);
      setPayButtonDisable(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <React.Fragment>
        <form onSubmit={submitHandelar} className="payment_form">
          <label>
            Card number
            <CardNumberElement options={options} />
          </label>
          <Box className="cvv_expire flex" sx={{ width: "100%" }}>
            <Box sx={{ width: "70%" }}>
              <label>
                Expiration date
                <CardExpiryElement options={options} />
              </label>
            </Box>
            <Box sx={{ width: "30%" }}>
              <label>
                CVC
                <CardCvcElement options={options} />
              </label>
            </Box>
          </Box>

          <Box>
            <Tooltip
              title={
                payButtonDisable ? "Please fill all input" : "Click to pay"
              }
            >
              <Button
                htmlType="submit"
                type="primary"
                disabled={payButtonDisable || orderLading}
              >
                Pay
              </Button>
            </Tooltip>
          </Box>
        </form>
      </React.Fragment>
    </Spin>
  );
};

export default PaymentComponent;
