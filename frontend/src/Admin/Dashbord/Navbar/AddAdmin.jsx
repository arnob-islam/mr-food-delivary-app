import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Modal, Form, Input, Button, message } from "antd";
import { CREATE_NEW_ADMIN } from "./../../../Graphql/Mutations/PublicAdmin";

const AddNewAdmin = ({ adminModel, setAdminModel }) => {
  const [form] = Form.useForm();

  const [CreateNewAdmin, { data, loading }] = useMutation(CREATE_NEW_ADMIN);

  useEffect(() => {
    if (data) {
      if (!data.CreateNewAdmin.success) {
        message.error(data.CreateNewAdmin.message);
      } else {
        setAdminModel(false);
        message.info("Admin created");
      }
    }
  }, [data, setAdminModel]);

  function handleSubmit(e) {
    const { userName, email, password } = e;
    if (password.length < 8) {
      message.warning("your password should be more then 8");
      return;
    }
    CreateNewAdmin({
      variables: {
        input: {
          userName,
          email,
          password,
        },
      },
    });
  }

  const handleOk = () => {
    const { userName, email, password } = form.getFieldsValue();
    if (!userName || !email || !password) {
      message.error("Your Field is empty");
      return;
    }
    setAdminModel(false);
  };

  return (
    <Modal
      title="Add New Admin to Dashbord"
      centered
      visible={adminModel}
      onOk={() => handleOk()}
      onCancel={() => setAdminModel(false)}
      confirmLoading={loading}
    >
      <Form
        name="add_new_admin"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: "Input Admin user name" }]}
        >
          <Input placeholder="e.g jhon_doe" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Input Admin user Email" }]}
        >
          <Input type={"email"} placeholder="e.g jhondoe@gmail.com" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Input Admin user Email" }]}
        >
          <Input type={"password"} placeholder="password" />
        </Form.Item>

        <Form.Item style={{ marginTop: "1rem" }}>
          <Button type="primary" htmlType="submit" block>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewAdmin;
