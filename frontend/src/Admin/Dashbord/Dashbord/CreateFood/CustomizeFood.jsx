import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import { Row, Form, Input, Col, Button, InputNumber, message } from "antd";
import NewFoodPreview from "./NewFoodPreview";

const AddNewFood = ({ CreateFun, data, loading, dataInfo }) => {
  // const [CreateNewFood, { data, loading }] = useMutation(CREATE_NEW_FOOD);

  const [formValue, setFormValue] = useState({
    name: "",
    subTitle: "",
    thumb: "",
    catagory: "",
    price: "",
    recipe: "",
  });

  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    if (!formValue.thumb) {
      message.warning("Food picture is not selected");
      return;
    }

    const { name, subTitle, thumb, catagory, price, recipe } = formValue;
    CreateFun({
      variables: {
        input: {
          foodName: name,
          subTitle,
          thumb,
          catagory,
          price,
          recipe,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (dataInfo.success.status) {
        message.success(dataInfo.success.message);
        form.setFieldsValue({
          name: "",
          subTitle: "",
          thumb: "",
          catagory: "",
          recipe: "",
        });

        setFormValue({
          name: "",
          subTitle: "",
          thumb: "",
          catagory: "",
          price: "",
          recipe: "",
        });
        return;
      } else if (dataInfo.fail.status) {
        message.success(dataInfo.fail.message);
        return;
      }
    }
  }, [data, form, dataInfo]);

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
          <Col lg={12} md={18} xs={24}>
            <NewFoodPreview data={formValue} />
          </Col>
          <Col lg={12} md={18} xs={24}>
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
                rules={[{ required: true, message: "Input your food name" }]}
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
                rules={[{ required: false, message: "Input your subTitle" }]}
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
                rules={[{ required: true, message: "Input your catagory" }]}
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
                rules={[{ required: true, message: "Input your food price" }]}
              >
                <InputNumber
                  name="price"
                  min={1}
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
                rules={[{ required: true, message: "Input your food recipe" }]}
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
                  disabled={loading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddNewFood;
