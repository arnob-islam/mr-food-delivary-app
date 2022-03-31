/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import ShowSmallAlert from "../../components/SingleComponent/ShowSmallAlert";
import { ADMIN_LOGIN_TYPE } from "../../Graphql/Mutations/AdminAuth";
import { useMutation } from "@apollo/client";
import BackDropLoading from "../../components/SingleComponent/BackDropLoading";
import { Row, Col, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Container, Grid, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [AdminLogin, { data, error, loading }] = useMutation(ADMIN_LOGIN_TYPE);
  const [message, setMessage] = React.useState({
    open: false,
    message: "",
  });

  const handleSubmit = async (value) => {
    const { userName, password } = value;

    if (!userName || !password) {
      setMessage({
        open: true,
        message: "please fill input",
      });
    }
    try {
      AdminLogin({
        variables: {
          userName,
          password,
        },
      });
    } catch (error) {
      setMessage({
        open: true,
        message: "Error try to refresh",
      });
    }
  };

  useEffect(() => {
    if (data) {
      if (data.AdminLogin.success) {
        dispatch({
          type: "ADMIN_AUTH_SUCCESS",
          payload: data.AdminLogin.admin,
        });
        sessionStorage.setItem(
          "__admin",
          JSON.stringify(data.AdminLogin.admin)
        );
        setTimeout(() => {
          navigate("/admin/dashbord", {
            replace: true,
          });
        }, 500);
      } else {
        setMessage({
          open: true,
          message: data.AdminLogin.message,
        });
      }
    }
    if (error) {
      setMessage({
        open: true,
        message: "error try to refresh",
      });
    }
  }, [data, error, navigate, dispatch]);

  useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);

  return (
    <>
      <Container maxWidth="xlg" style={{ padding: 0 }}>
        <Row>
          <Col lg={12} md={18} xs={24} className="auth_login">
            <Box className="auth_form akka__" sx={{ p: 5 }}>
              <Box className="flex j-c-s-b">
                <Box>
                  <Avatar src="/imgage/slug.png" />
                </Box>
                <Box className="flex">
                  <Box className="link_box">
                    <NavLink
                      to="/user/login"
                      className={({ isActive }) =>
                        isActive ? "c-red font-bold" : "font-thin"
                      }
                    >
                      AdminLogin
                    </NavLink>
                  </Box>
                  <Box className="link_box">
                    <NavLink
                      to="/user/signup"
                      className={({ isActive }) =>
                        isActive ? "c-red font-bold" : "font-thin"
                      }
                    >
                      Sign Up
                    </NavLink>
                  </Box>
                </Box>
              </Box>

              <Box className="auth_title" sx={{ py: 2 }}>
                <h2>Admin</h2>
                <span>Log in to continue dashbord</span>
              </Box>

              <Box
                sx={{
                  pt: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pr: 3,
                }}
              >
                <Form
                  name="login_form"
                  className="login-form "
                  initialValues={{
                    size: "large",
                  }}
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name="userName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your user name!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="user name"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Grid className="flex j-c-s-b">
                    <Grid>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Log in
                      </Button>
                    </Grid>
                    <Box item xs>
                      <Link to="/user/forget-password" className="c-white">
                        Forgot password?
                      </Link>
                    </Box>
                  </Grid>
                </Form>
              </Box>
            </Box>
          </Col>

          <Col lg={12} md={12} xs={0} className=" auth_bg_view">
            <Box
              style={{ backgroundImage: `url(/image/login-1.jpg)` }}
              className="bg_auth_"
              sx={{ p: 5 }}
            />
          </Col>
        </Row>
      </Container>

      <ShowSmallAlert
        open={message.open}
        setClose={setMessage}
        message={message.message}
      />

      {loading && <BackDropLoading />}
    </>
  );
}
