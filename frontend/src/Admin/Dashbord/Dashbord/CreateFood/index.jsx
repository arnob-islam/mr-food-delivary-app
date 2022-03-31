import React, { useEffect, useState } from "react";
import CustomizeFood from "./CustomizeFood";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_FOOD } from "../../../../Graphql/Mutations/PublicAdmin";

const Index = () => {
  const [CreateNewFood, { data, loading }] = useMutation(CREATE_NEW_FOOD);
  const [dataInfo, setdataInfo] = useState({
    success: { status: false, message: "" },
    fail: { status: false, message: "" },
  });
  const CreateFun = (obj) => {
    CreateNewFood(obj);
  };

  useEffect(() => {
    if (data) {
      if (data.AdminCreateFood.success) {
        setdataInfo((pre) => {
          return {
            ...pre,
            success: {
              status: true,
              message: data.AdminCreateFood.message,
            },
          };
        });
      } else {
        setdataInfo((pre) => {
          return {
            ...pre,
            fail: {
              status: true,
              message: data.AdminCreateFood.message,
            },
          };
        });
      }
    }
  }, [data]);

  return (
    <>
      <CustomizeFood
        CreateFun={CreateFun}
        data={data}
        loading={loading}
        dataInfo={dataInfo}
      />
    </>
  );
};

export default Index;
