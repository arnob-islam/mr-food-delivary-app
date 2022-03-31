import React from "react";
import { Container, Box } from "@mui/material";
import { Row, Col } from "antd";

const LearnMoreCarrer = () => {
  return (
    <section className="_SEC">
      <Container maxWidth="md">
        <Row justify="center" align="center" gutter={[0, 32]}>
          <Col lg={14} md={24} xs={24}>
            <Box className="carrer_body">
              <Box className="img_wrapper_carrer">
                <img src="/image/coming-soon.gif" alt="" />
              </Box>
            </Box>
          </Col>
          <Col lg={16} md={24} xs={24}>
            <Box className="carrer_info_brading" sx={{ mt: 3 }}>
              <div className="heading_info">
                <h1>Sorry! Our this service is unaviable</h1>
              </div>
            </Box>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LearnMoreCarrer;
