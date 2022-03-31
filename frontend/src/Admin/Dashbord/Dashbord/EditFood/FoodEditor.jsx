import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import {
  Row,
  Form,
  Input,
  Col,
  Button,
  InputNumber,
  message,
  Spin,
} from "antd";
import NewFoodPreview from "../CreateFood/NewFoodPreview";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EDIT_SINGLE_FOOD } from "./../../../../Graphql/Query/AdminQuery";
import { useParams } from "react-router";
import { UPDATE_FOOD } from "../../../../Graphql/Mutations/PublicAdmin";
import { useNavigate } from "react-router-dom";

const AddNewFood = () => {
  const [UpdateFood, { data, loading }] = useMutation(UPDATE_FOOD);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: viewData, loading: viewLoading } = useQuery(
    GET_EDIT_SINGLE_FOOD,
    {
      variables: {
        id: id.split("=")[1],
      },
    }
  );

  const [formValue, setFormValue] = useState({
    name: "",
    subTitle: "",
    thumb: "",
    catagory: "",
    price: "",
    recipe: "",
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (viewData) {
      if (viewData.singleFood.success) {
        const { catagory, foodName, thumb, subTitle, price, recipe } =
          viewData.singleFood.food;
        setFormValue({
          name: foodName,
          subTitle,
          thumb,
          catagory,
          price,
          recipe,
        });
        form.setFieldsValue({
          name: foodName,
          subTitle,
          thumb,
          catagory,
          recipe,
          price,
        });
      }
    }
  }, [viewData, form]);

  const handleSubmit = (e) => {
    if (!formValue.thumb) {
      message.warning("Food picture is not selected");
      return;
    }

    const { name, subTitle, thumb, catagory, price, recipe } = formValue;
    UpdateFood({
      variables: {
        input: {
          foodName: name,
          subTitle,
          thumb,
          catagory,
          price,
          recipe,
        },
        id: id.split("=")[1],
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (data.AdminUpdateFood.success) {
        message.success(data.AdminUpdateFood.message);
        form.setFieldsValue({
          name: "",
          subTitle: "",
          thumb: "",
          catagory: "",
          recipe: "",
          price: "",
        });

        setFormValue({
          name: "",
          subTitle: "",
          thumb: "",
          catagory: "",
          price: "",
          recipe: "",
        });
        navigate(-1);
        return;
      } else if (!data.AdminUpdateFood.success) {
        message.error(data.AdminUpdateFood.message);
        return;
      }
    }
  }, [data, form, navigate]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      setFormValue((pre) => {
        return {
          ...pre,
          thumb: fileReader.result,
        };
      });
    };
    fileReader.readAsDataURL(file);
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormValue((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  return (
    <section className="_SEC __preview__sec">
      <Container>
        <Row className="add_food_row j-c-s-b" gutter={16}>
          {viewLoading ? (
            <EditorLoading />
          ) : (
            <>
              <Col lg={12} md={18} xs={24}>
                {<NewFoodPreview data={formValue} />}
              </Col>
              <Col lg={12} md={18} xs={24}>
                {
                  <Form
                    form={form}
                    name="order-delivery-form osf"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={handleSubmit}
                  >
                    <Box sx={{ mb: 2 }}>
                      <input
                        accept="image/*"
                        className={"add_photo"}
                        id="add_photo"
                        type="file"
                        onChange={handleFile}
                      />
                    </Box>

                    <Form.Item
                      name="name"
                      rules={[
                        { required: true, message: "Input your food name" },
                      ]}
                    >
                      <Input
                        placeholder="e.g burger"
                        size="large"
                        name="name"
                        onChange={handleOnChange}
                      />
                    </Form.Item>

                    <Form.Item
                      name="subTitle"
                      rules={[
                        { required: false, message: "Input your subTitle" },
                      ]}
                    >
                      <Input
                        placeholder="e.g best for 2 people"
                        size="large"
                        name="subTitle"
                        onChange={handleOnChange}
                      />
                    </Form.Item>

                    <Form.Item
                      name="catagory"
                      rules={[
                        { required: true, message: "Input your catagory" },
                      ]}
                    >
                      <Input
                        placeholder="e.g pizza"
                        size="large"
                        name="catagory"
                        onChange={handleOnChange}
                      />
                    </Form.Item>

                    <Form.Item
                      name="price"
                      rules={[
                        { required: true, message: "Input your food price" },
                      ]}
                    >
                      <InputNumber
                        name="price"
                        min={1}
                        // defaultValue={formValue.price}
                        onChange={(e) =>
                          setFormValue((pre) => {
                            return {
                              ...pre,
                              price: e,
                            };
                          })
                        }
                        placeholder="Food price"
                      />
                    </Form.Item>

                    <Form.Item
                      name="recipe"
                      rules={[
                        { required: true, message: "Input your food recipe" },
                      ]}
                    >
                      <Input
                        name="recipe"
                        placeholder="e.g onion, beef, chicken"
                        size="large"
                        onChange={handleOnChange}
                      />
                    </Form.Item>

                    <Form.Item style={{ marginTop: "1rem" }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                }
              </Col>
            </>
          )}
        </Row>
      </Container>
    </section>
  );
};

const EditorLoading = () => {
  return (
    <Box className="flex a-i-c j-c-c">
      <Spin size="large" tip="Loading data...." />
    </Box>
  );
};

export default AddNewFood;
