import React, { useState } from "react";
import { Col, Rate, Tooltip, Row, Dropdown, Menu, Modal } from "antd";
import { Box } from "@mui/material";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { message } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { DELETE_FOOD } from "./../../../../Graphql/Mutations/PublicAdmin";

const DisplaySingleFood = ({ data, fun }) => {
  const [modelOpen, setModelOpen] = useState([false, ""]);

  function confirm(id) {
    Modal.confirm({
      title: "Are you sure",
      icon: <ExclamationCircleOutlined />,
      content: "It will be removed permanently if you delete it",
      okText: "Delete",
      cancelText: "Cancle",
      onOk: () => setModelOpen([true, id]),
    });
  }

  return (
    <>
      <Row>
        <Col style={{ width: "100%" }}>
          <Box>
            <ul className="foods_ul flex f-d-c">
              {data.map((e) => {
                const { foodName, price, recipe, star, subTitle, thumb, _id } =
                  e;

                return (
                  <li key={_id} className="list_each flex j-c-s-b a-i-c">
                    <Box
                      className="flex"
                      sx={{ gap: "1.5rem", alignItems: "center" }}
                    >
                      <Box className="ad__image_branding">
                        <img src={thumb} alt="" />
                      </Box>
                      <Box className="single_food_info">
                        <div className="food_heading_branding flex j-c-s-b">
                          <div className="title_branding">
                            <h1>{foodName}</h1>
                          </div>
                          <div className="food-price">
                            <span>${price}</span>
                          </div>
                        </div>
                        {subTitle && (
                          <div className="food-subtitle">{subTitle}</div>
                        )}
                        <div className="food-star flex a-i-c">
                          <Box className="starts" sx={{ mr: 2 }}>
                            <Tooltip title={`${star} start`} color={"#2db7f5"}>
                              <div>
                                <Rate disabled allowHalf defaultValue={star} />
                              </div>
                            </Tooltip>
                          </Box>
                          <div className="start_numbe">{star} votes</div>
                        </div>

                        <div className="food_recipe">{recipe}</div>
                      </Box>
                    </Box>
                    <Box className="food_options_threedot">
                      <Dropdown.Button
                        overlay={
                          <Menu style={{ width: "9.5rem" }}>
                            <Menu.Item key="1" icon={<AiOutlineEdit />}>
                              <Link to={`/admin/dashbord/edit/id=${_id}`}>
                                Edit this
                              </Link>
                            </Menu.Item>
                            <Menu.Item
                              key="3"
                              icon={<AiOutlineDelete />}
                              onClick={() => confirm(_id)}
                            >
                              Delete food
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={["click"]}
                        type="link"
                        className="three_dot_button"
                      />
                    </Box>
                  </li>
                );
              })}
            </ul>
          </Box>
        </Col>
      </Row>
      {modelOpen && (
        <ConfirmDeleteFoodModel
          modelOpen={modelOpen}
          setModelOpen={setModelOpen}
          fun={fun}
        />
      )}
    </>
  );
};

const ConfirmDeleteFoodModel = ({ modelOpen, setModelOpen, fun }) => {
  const [form] = Form.useForm();

  const [DeleteFood, { data, loading }] = useMutation(DELETE_FOOD);

  useEffect(() => {
    if (data) {
      if (!data.AdminDeleteFood.success) {
        message.error(data.AdminDeleteFood.message);
        setModelOpen(false);
      } else {
        setModelOpen(false);
        message.info(data.AdminDeleteFood.message);
        fun();
      }
    }
  }, [data, setModelOpen, fun]);

  function handleSubmit(e) {
    const { userName, password } = e;

    DeleteFood({
      variables: {
        userName,
        password,
        id: modelOpen[1],
      },
    });
  }

  const handleOk = () => {
    const { userName, password } = form.getFieldsValue();
    if (!userName || !password) {
      message.error("Your Field is empty");
      return;
    }
  };

  return (
    <Modal
      title="Input your user name & password to delete This item"
      centered
      visible={modelOpen[0]}
      onOk={() => handleOk()}
      onCancel={() => setModelOpen([false, ""])}
      // confirmLoading={loading}
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
          name="password"
          rules={[{ required: true, message: "Input Admin user Email" }]}
        >
          <Input type={"password"} placeholder="password" />
        </Form.Item>

        <Form.Item style={{ marginTop: "1rem" }}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Delete
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DisplaySingleFood;
