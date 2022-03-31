import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router";
import ShowSmallAlert from "../SingleComponent/ShowSmallAlert";
import validator from "validator";
import { NavLink } from "react-router-dom";
import { REGISTER } from "../../Graphql/Mutations/UserAuthentication";
import { useMutation } from "@apollo/client";
import BackDropLoading from "../SingleComponent/BackDropLoading";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Row, Col, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

export default function AdminSignUp() {
  const navigate = useNavigate();

  const [SendRegister, { error, loading, data }] = useMutation(REGISTER);

  const dispatch = useDispatch();

  const [message, setMessage] = React.useState({
    open: false,
    message: "",
  });

  const handleSubmit = async (value) => {
    const { firstName, lastName, email, password } = value;

    if (!firstName || !lastName || !email || !password) {
      setMessage({
        open: true,
        message: "Please fill the input",
      });
      return;
    }
    if (!validator.isEmail(email) || email.split("@")[0].length < 5) {
      setMessage({
        open: true,
        message: "Please enter a valid email",
      });
      return;
    }
    if (password.length < 8) {
      setMessage({
        open: true,
        message: "Your Password should be more then 8",
      });
      return;
    }
    try {
      SendRegister({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            password,
          },
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
      if (data.signUp.success) {
        dispatch({ type: "AUTH_SUCCESS", payload: data.signUp.user });
        sessionStorage.setItem(
          "__admin",
          JSON.stringify(data.AdminLogin.admin)
        );
        setTimeout(() => {
          navigate("/", {
            replace: true,
          });
        }, 500);
      } else {
        setMessage({
          open: true,
          message: data.signUp.message,
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
          <Col lg={12} md={18} xs={24} className="">
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
                      Login
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
                <h2>Sign Up</h2>
                <span>Sign up to continue in our website</span>
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
                  <Box className="name_auth">
                    <Form.Item
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your firstName!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="firstName"
                      />
                    </Form.Item>
                    <Form.Item
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "Please input your lastName!",
                        },
                      ]}
                    >
                      <Input
                        prefix={
                          <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="lastName"
                      />
                    </Form.Item>
                  </Box>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <MailOutlineIcon className="site-form-item-icon" />
                      }
                      placeholder="email"
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
                        Sign up
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Box>
            </Box>
          </Col>

          <Col lg={12} md={12} xs={0} className=" auth_bg_view">
            <Box
              style={{ backgroundImage: `url(/image/register-1.jpg)` }}
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
