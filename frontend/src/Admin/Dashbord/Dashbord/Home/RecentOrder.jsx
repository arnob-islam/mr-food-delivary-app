import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ADMIN_ADD_ORDERS } from "../../../../Graphql/Query/AdminQuery";
import SingleOrder from "./SingleOrder";
import { UPDATE_ADMIN_ORDER_STATUS } from "../../../../Graphql/Mutations/PublicAdmin";
import { useDispatch, useSelector } from "react-redux";

const RecentOrder = () => {
  const [GetRecentOrder, { loading, data }] =
    useLazyQuery(GET_ADMIN_ADD_ORDERS);

  const [UpdateStatus, { data: updateData }] = useMutation(
    UPDATE_ADMIN_ORDER_STATUS
  );

  const { socket } = useSelector((state) => state.GlobalReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    GetRecentOrder();
  }, [GetRecentOrder]);

  useEffect(() => {
    if (updateData) {
      GetRecentOrder();
      dispatch({ type: "NEW_ORDER_STATUS_IS_UPDATED" });
    }
  }, [updateData, GetRecentOrder, dispatch]);

  const UpdateOrderStatus = (status, id) => {
    UpdateStatus({
      variables: {
        status,
        id,
      },
    });
  };

  useEffect(() => {
    if (updateData) {
      if (updateData.AdminUpdateOrder.success) {
        socket.emit("OrderStatusIsUpdated", {
          foodId: updateData.AdminUpdateOrder.info.foodId,
          userId: updateData.AdminUpdateOrder.info.userId,
        });
      }
    }
  }, [updateData, socket]);

  return (
    <section className="_SEC">
      <Container>
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <SingleOrder
            data={data ? data.AdminAllOrders.foodItem : []}
            UpdateStatus={UpdateOrderStatus}
          />
        )}
      </Container>
    </section>
  );
};

export default RecentOrder;
