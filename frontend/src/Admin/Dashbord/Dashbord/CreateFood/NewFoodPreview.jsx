import React from "react";
import { Box } from "@mui/material";
// import { styled } from "@mui/system";

// const ListItem = styled("li")(({ theme }) => ({
//   margin: theme.spacing(0.5),
// }));

const PreviewNewProduct = ({ data }) => {
  const { name, thumb, subTitle, catagory, price, recipe } = data;

  return (
    <Box className="preivew_container flex f-d-c">
      <Box className="preview_wrapper">
        <div className="img_preivw">
          <img
            src={thumb ? thumb : "/image/placeholder.png"}
            className="img-fluid"
            alt=""
          />
        </div>

        <Box className="title_preivw  priew_" sx={{ mt: 2 }}>
          <h1>Name : {name}</h1>
        </Box>
        <div className="_preivw  priew_">
          <h1>Sub Title : {subTitle}</h1>
        </div>
        <div className="_preivw  priew_">
          <h1>Price (usd) : {price}</h1>
        </div>
        <div className="_preivw priew_">
          <h1>{`catagory: ${catagory}`}</h1>
        </div>
        <div className="_preivw priew_">
          <h1>{`Recipe: ${recipe}`}</h1>
        </div>
      </Box>
    </Box>
  );
};

export default PreviewNewProduct;
