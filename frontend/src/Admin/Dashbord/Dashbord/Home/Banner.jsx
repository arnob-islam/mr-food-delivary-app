import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Container from "@mui/material/Container";
import { Col, Row } from "antd";
import { Spin } from "antd";
import { useLazyQuery } from "@apollo/client";

import { Box } from "@mui/material";
import {
  GET_CASH_OF_THE_MONTH,
  OVERVIEW_OF_THE_MONTHH,
} from "../../../../Graphql/Query/AdminQuery";
import { useDispatch, useSelector } from "react-redux";

const Banner = () => {
  const [GetCashOfTheMonth, { loading, data }] = useLazyQuery(
    GET_CASH_OF_THE_MONTH
  );
  const [
    GetOverViewOfTheMonth,
    { loading: overviewLoading, data: overviewData },
  ] = useLazyQuery(OVERVIEW_OF_THE_MONTHH);
  const dispatch = useDispatch();

  const { orderUpdate } = useSelector((state) => state.AdminReducer);

  useEffect(() => {
    GetCashOfTheMonth();
    GetOverViewOfTheMonth();
  }, [GetCashOfTheMonth, GetOverViewOfTheMonth]);

  useEffect(() => {
    if (orderUpdate) {
      GetCashOfTheMonth();
      GetOverViewOfTheMonth();
    }
  }, [orderUpdate, GetCashOfTheMonth, GetOverViewOfTheMonth]);

  useEffect(() => {
    if (orderUpdate) {
      setTimeout(() => {
        dispatch({ type: "ORDER_STATUS_UPDATE_FALLBACK" });
      }, 3000);
    }
  }, [orderUpdate, dispatch]);

  return (
    <>
      <section className="_SEC">
        <Container>
          <Row gutter={16}>
            {overviewLoading ? (
              <OverviewLoading />
            ) : (
              <>
                <Col className="col_overivew" lg={6} md={10} xs={22}>
                  <Box className="order_count">
                    <div className="count_number">
                      <div className="count_title">
                        <h1>Order delivared</h1>
                      </div>
                      <div className="count_amount">
                        <h1>
                          {overviewData
                            ? overviewData.OrderOverview.overview
                                .confirmDelivared
                            : ""}
                        </h1>
                      </div>
                    </div>
                    <div className="order_svg">
                      <img src="/image/delivared.svg" alt="" />
                    </div>
                  </Box>
                </Col>
                <Col className="col_overivew" lg={6} md={10} xs={22}>
                  <Box className="order_count">
                    <div className="count_number">
                      <div className="count_title">
                        <h1>Total food item</h1>
                      </div>
                      <div className="count_amount">
                        <h1>
                          {overviewData
                            ? overviewData.OrderOverview.overview.foodItems
                            : ""}
                        </h1>
                      </div>
                    </div>
                    <div className="order_svg">
                      <img src="/image/manu.svg" alt="" />
                    </div>
                  </Box>
                </Col>
                <Col className="col_overivew" lg={6} md={10} xs={22}>
                  <Box className="order_count">
                    <div className="count_number">
                      <div className="count_title">
                        <h1>Order Rejected of the month</h1>
                      </div>
                      <div className="count_amount">
                        <h1>
                          {overviewData
                            ? overviewData.OrderOverview.overview
                                .confirmDelivared.rejected
                            : ""}
                        </h1>
                      </div>
                    </div>
                    <div className="order_svg">
                      <img src="/image/cancled.svg" alt="" />
                    </div>
                  </Box>
                </Col>
                <Col className="col_overivew" lg={6} md={10} xs={22}>
                  <Box className="order_count">
                    <div className="count_number">
                      <div className="count_title">
                        <h1>New user of this month</h1>
                      </div>
                      <div className="count_amount">
                        <h1>
                          {overviewData
                            ? overviewData.OrderOverview.overview.users
                            : ""}
                        </h1>
                      </div>
                    </div>
                    <div className="order_svg">
                      <img src="/image/user.svg" alt="" />
                    </div>
                  </Box>
                </Col>
              </>
            )}
          </Row>
        </Container>
      </section>

      <section className="_SEC">
        <Container>
          {loading ? (
            <Spinner />
          ) : (
            <MoneyChart data={data ? data.cashOfCurrentMonth.chartinfo : []} />
          )}
        </Container>
      </section>
    </>
  );
};

const MoneyChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data}>
        <Bar dataKey="usd" fill="#1890ff" />
        <Tooltip />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
};

const Spinner = () => {
  return (
    <div className="spinner flex a-i-c j-c-c">
      <Spin />
    </div>
  );
};

const OverviewLoading = () => {
  const arr = ["a", "B", "c", "d"];
  return (
    <>
      {arr.map((e) => (
        <Col className="order_of_the_month" lg={6} md={10} xs={22} key={e}>
          <Spinner />
        </Col>
      ))}
    </>
  );
};

export default Banner;
