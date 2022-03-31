import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { Row, Col, Form, Input, Button, message } from "antd";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { useMutation } from "@apollo/client";
import {
  UPDATE_USER_INFORMATION,
  UPDATE_USER_PASSWORD,
} from "./../../Graphql/Mutations/UserAuthentication";

const UserProfile = () => {
  return (
    <section className="_SEC">
      <Container maxWidth="md">
        <Row justify="center">
          <Col lg={12} md={12} xs={24}>
            <ProfileTitle title="My Profile" />
            <UserInformation />

            <ProfileTitle title="Change password" />
            <UserPasswordComponet />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const ProfileTitle = ({ title }) => {
  return (
    <Box className="profile_title flex a-i-c j-c-c" sx={{ mt: 2, mb: 3 }}>
      <h1>{title}</h1>
    </Box>
  );
};

const UserInformation = () => {
  const [form] = Form.useForm();

  const { user } = useSelector((state) => state.UserReducer);

  const [updateUserInfo, { loading, data }] = useMutation(
    UPDATE_USER_INFORMATION
  );

  const [userFormValue, setUserFormValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [buttonDisable, setButtonDisable] = useState(true);

  useEffect(() => {
    const { firstName, lastName, email } = user;
    setUserFormValue({
      firstName,
      lastName,
      email,
    });
  }, [user]);

  useEffect(() => {
    const { firstName, lastName, email } = user;
    form.setFieldsValue({
      firstName,
      lastName,
      email,
    });
  }, [user, form]);

  useEffect(() => {
    const { firstName, lastName, email } = user;
    if (
      userFormValue.email === email ||
      userFormValue.firstName === firstName ||
      userFormValue.lastName === lastName
    ) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [user, userFormValue]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserFormValue({
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    updateUserInfo({
      variables: e,
    });
  };

  useEffect(() => {
    if (data) {
      if (data.updateUserInfo.success) {
        message.success(data.updateUserInfo.message);
      }
      if (!data.updateUserInfo.success) {
        message.error(data.updateUserInfo.message);
      }
    }
  }, [data]);

  if (Object.keys(user).length === 0) {
    return <ProfileLoading />;
  }
  return (
    <Box className="user_information_box">
      <Box className="information_body">
        <Form
          form={form}
          name="personal-info"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleSubmit}
          className="user_info_form __pp"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Input your 'Email' " }]}
          >
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              size="large"
              onChange={handleOnChange}
            />
          </Form.Item>

          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Input your 'first name' " }]}
          >
            <Input
              name="firstName"
              placeholder="Enter your first name"
              size="large"
              onChange={handleOnChange}
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Input your 'last name' " }]}
          >
            <Input
              name="lastName"
              placeholder="Enter your last name"
              size="large"
              onChange={handleOnChange}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: "1rem" }}>
            <Box sx={{ justifyContent: "end" }} className="flex">
              <Button
                type="primary"
                htmlType="submit"
                disabled={buttonDisable}
                loading={loading}
              >
                save
              </Button>
            </Box>
          </Form.Item>
        </Form>
      </Box>
    </Box>
  );
};

const ProfileLoading = () => {
  return (
    <>
      {["a", "b", "c"].map((e) => (
        <Skeleton
          animation="pulse"
          key={e}
          sx={{ width: "100%", background: "#364758" }}
          height={55}
        />
      ))}
    </>
  );
};

const UserPasswordComponet = () => {
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.UserReducer);

  const [updatePassord, { loading, data }] = useMutation(UPDATE_USER_PASSWORD);

  const handleSubmit = (e) => {
    const { confirm, password } = e;
    if (confirm.length < 8 || password.length < 8) {
      message.warning("Your passowrd should be more then 8");
      return;
    }
    updatePassord({
      variables: {
        oldPassword: password,
        newPassword: confirm,
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (data.updateUserPassword.success) {
        message.success(data.updateUserPassword.message);
      }
      if (!data.updateUserPassword.success) {
        message.error(data.updateUserPassword.message);
      }
    }
  }, [data]);

  if (Object.keys(user).length === 0) {
    return <ProfileLoading />;
  }
  return (
    <Box className="user_password_body">
      <Box className="user_password_box">
        <Form
          form={form}
          name="password-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleSubmit}
          className="__pp"
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="current password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
            ]}
          >
            <Input.Password placeholder="New password" />
          </Form.Item>

          <Form.Item style={{ marginTop: "1rem" }}>
            <Box sx={{ justifyContent: "end" }} className="flex">
              <Button
                type="primary"
                htmlType="submit"
                // disabled={buttonDisable}
                loading={loading}
              >
                save
              </Button>
            </Box>
          </Form.Item>
        </Form>
      </Box>
    </Box>
  );
};

export default UserProfile;
