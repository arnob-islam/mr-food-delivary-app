import React, { useState } from 'react'
import { Container, Box } from '@mui/material';
import { Row, Col, Form, Button } from 'antd';
import { Input } from 'antd';
import { FiEdit } from "react-icons/fi";
import SummeryHeading from './SummeryHeading';
import PaymentComponent from './PaymentComponent'
import { useDispatch, useSelector } from 'react-redux';

const { TextArea } = Input;

const OrderSummery = () => {

  const [form] = Form.useForm();

  const dispatch = useDispatch()

  const [userAddress, setAddress] = useState({ area: "", note: "", street: "" })

  const [toogleAddress, seToogleAddress] = useState(false)


  const { orderList } = useSelector(state => state.FoodOrderReducer)

  const handleSubmit = (e) => {
    const { area, street, note } = e
    setAddress(e)
    if (area && street && note) {

      dispatch({ type: "USER_ADDRESS", payload: e })

      seToogleAddress(true)
    }

  }

  const getFoodItems = () => {
    return orderList.length !== 0 ? orderList : JSON.parse(sessionStorage.getItem("orderItem"))
  }

  const handleClick = () => {
    const { area, street, note } = userAddress

    form.setFieldsValue({
      area, street, note
    });
    seToogleAddress(false)

  }


  return (
    <section className='_SEC order_summery_sec' >
      <Container maxWidth='md' >
        <Row gutter={16} className='j-c-s-b' >
          <Col className='order_delivery_details' lg={12} md={12} xs={24}  >
            <main className='order_delivery_main_box' >

              <SummeryHeading number={1} title={"Delivery details"} />

              {toogleAddress ? <AddressOverView address={userAddress} handleClick={handleClick} /> :

                <Form
                  form={form}
                  name="order-delivery-form osf"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 24 }}

                  // onValuesChange={handleValueChanged}
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name="area"
                    tooltip="Your city name. only city name not your division/ state"
                    rules={[{ required: true, message: "Input your 'area' " }]}
                  >
                    <Input placeholder='Enter your area' size='large' />
                  </Form.Item>

                  <Form.Item
                    name="street"
                    tooltip="Your home address route. Road or subroad"
                    rules={[{ required: true, message: "Input your 'street' " }]}
                  >
                    <Input placeholder='e.g sector-12, road #08' size='large' />
                  </Form.Item>

                  <Form.Item
                    name="note"
                    tooltip="Delivery man will drop your order in your hand"
                    rules={[{ required: true, message: "Note for rider" }]}
                  >
                    <TextArea showCount maxLength={100} placeholder='e.g floor/ building/ landmark' />
                  </Form.Item>

                  <Form.Item style={{ marginTop: "1rem" }} >
                    <Button type="primary" htmlType="submit" block  >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              }
            </main>

            {/* personal information  start */}
            <Box component='main' sx={{ mt: 4.5 }} >
              <PersonalInfo />
            </Box>
            {/* personal information end */}


            {/* personal information start */}
            <Box component='main' sx={{ mt: 4.5 }} >
              <PaymentComponent />
            </Box>
            {/* personal information end */}


          </Col>

          <Col className='chackout_overview' lg={10} md={10} xs={22}  >
            <Box  >
              <div className='chackout_summery_box' >
                <Box className="chackout_summery_heading" sx={{ textAlign: "center" }} >
                  <h1>
                    Your Order
                  </h1>
                </Box>

                <Box className="chackout_food_item">
                  <div className="order-list-food-item">
                    <div className="order-list-box">
                      {getFoodItems().map(e => {
                        return <Box key={e._id} className='food-item-body' >
                          <div className="food_title_branding flex a-i-c j-c-s-b">

                            <div className="food_item_title">
                              <h4>
                                {e.qty} x {e.foodName}
                              </h4>
                            </div>
                            <div className="food_item_price">
                              <span>
                                ${e.price * e.qty}
                              </span>
                            </div>
                          </div>

                        </Box>
                      })}
                    </div>
                  </div>
                </Box>

                <Box className='chackout_box_body' sx={{ mt: 2, pt: 2, borderTop: "1px solid #747474" }} >
                  <div className='sub_total_food chackout_xo' >
                    <h5>
                      subtotal
                    </h5>

                    <h5>
                      ${getFoodItems().reduce((acc, e) => acc + e.qty * e.price, 0)}
                    </h5>

                  </div>
                  <div className='delevery_fee chackout_xo' >
                    <h5>
                      Delivery fee
                    </h5>
                    <h5>
                      free
                    </h5>
                  </div>
                  <div className='total_fee chackout_xo' >
                    <h5>
                      <b>
                        Total
                      </b>
                    </h5>
                    <h5>
                      <b>
                        ${getFoodItems().reduce((acc, e) => acc + e.qty * e.price, 0)}
                      </b>


                    </h5>
                  </div>
                </Box>

              </div>
            </Box>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

const AddressOverView = ({ address, handleClick }) => {
  const { area, street, note } = address


  return <Box sx={{ border: "1px solid #5c5c5c", mt: 3 }} >
    <Box className="overview_box flex j-c-s-b" sx={{ p: 2.5 }}>
      <div className="overview_body">
        <h3>
          {area}
        </h3>
        <h5>
          {street}
        </h5>
        <span>
          {note}
        </span>
      </div>
      <div className="edit_address">
        <Button
          type="text" danger
          icon={<FiEdit />}
          onClick={() => handleClick()}
        />

      </div>
    </Box>
  </Box>
}


const PersonalInfoEverView = ({ info, handleClick }) => {
  const { email, firstName, lastName, tel } = info


  return <Box sx={{ border: "1px solid #5c5c5c", mt: 3 }} >
    <Box className="overview_box flex j-c-s-b" sx={{ p: 2.5 }}>
      <div className="overview_body">
        <h3>
          {`${firstName} ${lastName}`}
        </h3>
        <h5>
          {email}
        </h5>
        <span>
          {tel}
        </span>
      </div>
      <div className="edit_address">
        <Button
          type="text" danger
          icon={<FiEdit />}
          onClick={() => handleClick()}
        />

      </div>
    </Box>
  </Box>
}



const PersonalInfo = () => {

  const dispatch = useDispatch()

  const [form] = Form.useForm();

  const [personalInfo, setPersonalInfo] = useState({ email: "", firstName: "", lastName: "", tel: "", })

  const [toogleInformation, seToogleInformation] = useState(false)

  const handleClick = () => {
    const { email, firstName, lastName, tel } = personalInfo

    form.setFieldsValue({
      email, firstName, lastName, tel
    });
    seToogleInformation(false)
  }

  const handleSubmit = (e) => {

    const { email, firstName, lastName, tel } = e

    setPersonalInfo(e)

    if (email && firstName && lastName && tel) {

      dispatch({ type: "USER_PERSONAL_INFORMATION", payload: e })

      seToogleInformation(true)
    }

  }




  return <Box className='personal_info_box' >
    <SummeryHeading number={2} title={"Personal information"} />
    <div>

      {toogleInformation ? <PersonalInfoEverView info={personalInfo} handleClick={handleClick} /> :
        <Form
          form={form}
          name="personal-info osf"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Input your 'Email' " }]}
          >
            <Input type="email" placeholder='Enter your email' size='large' />
          </Form.Item>

          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Input your 'first name' " }]}
          >
            <Input placeholder='Enter your first name' size='large' />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Input your 'last name' " }]}
          >
            <Input placeholder='Enter your last name' size='large' />
          </Form.Item>

          <Form.Item
            name="tel"

            rules={[{ required: true, message: "Input your 'phone number' " }]}
          >
            <Input placeholder='Enter your phone number' size='large' type="tel" />
          </Form.Item>



          <Form.Item style={{ marginTop: "1rem" }} >
            <Button type="primary" htmlType="submit" block  >
              save
            </Button>
          </Form.Item>
        </Form>
      }
    </div>
  </Box>
}




export default OrderSummery