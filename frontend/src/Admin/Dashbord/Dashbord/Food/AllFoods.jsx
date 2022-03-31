import React, { useEffect } from "react";
import { GET_ADMIN_ALL_FOODS } from "../../../../Graphql/Query/AdminQuery";
import { useLazyQuery } from "@apollo/client";
import { Container } from "@mui/material";
import FoodLoading from "./../../../../components/SingleComponent/FoodLoading";
import DisplaySingleFood from "./DisplaySingleFood";

const AllFoods = () => {
  const [fetchData, { loading, data }] = useLazyQuery(GET_ADMIN_ALL_FOODS);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="_SEC admin__display__food">
      <Container>
        {loading ? (
          <FoodLoading amount={5} />
        ) : (
          <DisplaySingleFood
            data={data ? data.allFoods.foods : []}
            fun={fetchData}
          />
        )}
      </Container>
    </section>
  );
};

export default AllFoods;
