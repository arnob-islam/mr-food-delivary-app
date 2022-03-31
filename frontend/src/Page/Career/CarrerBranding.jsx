import { Box, Container } from "@mui/material";
import { Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Typed from "react-typed";

const CarrerBranding = () => {
  return (
    <section className="carrer_sec">
      <Container>
        <Row className="cerrer_row" justify="space-between" align="center">
          <Box className="admin_carrer_branding">
            <div className="carrer_title admin_carrer">
              <Link to="/admin/dashbord">
                <h1>
                  <Typed loop strings={["Admin"]} typeSpeed={400} />
                </h1>
              </Link>
            </div>
          </Box>
          <Box>
            <div className="carrer_title">
              <Link to="/careers">
                <h1>
                  <Typed loop strings={["career"]} typeSpeed={400} />
                </h1>
              </Link>
            </div>
          </Box>
        </Row>
      </Container>
    </section>
  );
};

export default CarrerBranding;
