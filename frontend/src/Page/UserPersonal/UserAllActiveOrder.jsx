import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ACTIVE_ORDER } from "./../../Graphql/Query/OrderQuery";
import { Container } from "@mui/material";
import FoodLoading from "../../components/SingleComponent/FoodLoading";
import ViewUserOrders from "./ViewUserOrders";

const UserAllActiveOrder = () => {
  const { data, loading } = useQuery(GET_ACTIVE_ORDER);

  return (
    <section className="_SEC">
      <Container maxWidth="md">
        {loading ? (
          <FoodLoading amount={3} />
        ) : (
          <ViewUserOrders data={data ? data.userActiveOrder.foodItem : []} />
        )}
      </Container>
    </section>
  );
};

export default UserAllActiveOrder;
