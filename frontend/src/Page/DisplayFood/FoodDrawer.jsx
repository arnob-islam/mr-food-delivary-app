import React, { useEffect, useState } from 'react';
import { Button, Drawer, } from 'antd';
import { BiMinus, BiTimer } from "react-icons/bi";
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/system';
// import { PoweroffOutlined } from '@ant-design/icons';
import { MdOutlineDelete } from "react-icons/md";
import { BsPlus, } from "react-icons/bs";
import EmptyFood from './EmptyFood';
import { useNavigate } from 'react-router-dom'


const App = () => {

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate()

  const { orderList } = useSelector(state => state.FoodOrderReducer)

  const { user } = useSelector(state => state.UserReducer)


  const dispatch = useDispatch()

  useEffect(() => {
    if (orderList.length === 1) {
      setVisible(true);
    }
  }, [orderList])


  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const deleteFromList = (id) => {
    dispatch({ type: 'DELETE_FORM_LIST', payload: id })
  }
  const decreaseQty = (id) => {
    dispatch({ type: 'DECREASE_ITEM_QTY', payload: id })

  }
  const increaseQty = (id) => {
    dispatch({ type: 'INCREASE_ITEM_QTY', payload: id })
  }

  const takeToTheCheckout = () => {
    if (Object.keys(user).length === 0) {
      sessionStorage.setItem("nextRoute", "/checkout/summery")

      sessionStorage.setItem("orderItem", JSON.stringify(orderList))

      navigate("/user/login")
    } else {
      navigate("/checkout/summery")
      sessionStorage.setItem("orderItem", JSON.stringify(orderList))

    }

  }



  return (
    <>

      <div className='food_drawer_button' onClick={showDrawer}>
        <div className='button_rag' ></div>
      </div>

      <Drawer title="Your orders" placement="left" onClose={onClose} visible={visible} id='food-drawer' >
        {
          orderList.length === 0 ? <EmptyFood line={'Sorry you List is Empty'} /> :

            <React.Fragment >

              <div className="time-head-branding">
                <div className="icon-box">
                  <BiTimer />
                </div>
                <h3>
                  30-40 min long to delevery
                </h3>
              </div>

              <div className="order-list-food-item">
                <div className="order-list-box">
                  {orderList.map(e => {
                    return <Box key={e._id} className='food-item-body' >
                      <div className="food_title_branding flex a-i-c j-c-s-b">
                        <div className="food_item_title">
                          <h4>
                            {e.foodName}
                          </h4>
                        </div>
                        <div className="food_item_price">
                          <span>
                            ${e.price * e.qty}
                          </span>
                        </div>
                      </div>
                      <div className="food_item_qty_box flex">
                        <div className="qty-box-body flex a-i-c">
                          <div className="negetive-button">

                            {e.qty >= 2 ?
                              //  to decrease item form the orderlist 
                              <Button
                                type="text" danger
                                icon={<BiMinus />}
                                onClick={() => decreaseQty(e._id)}
                              /> :

                              //  to delete item from the list 
                              <Button
                                type="text" danger
                                icon={<MdOutlineDelete />}
                                onClick={() => deleteFromList(e._id)}
                              />

                            }
                          </div>
                          <span className='food_item_qty' >
                            {e.qty}
                          </span>
                          <div className="positive-button">
                            {/* increase item qty  */}
                            <Button
                              type="text" danger
                              icon={<BsPlus />}
                              onClick={() => increaseQty(e._id)}
                            />

                          </div>
                        </div>
                      </div>
                    </Box>
                  })}
                </div>
              </div>
              <div className='food_summery_box' >
                <div className='food_summery_body' >
                  <div className='sub_total_food summery_cx' >
                    <h5>
                      subtotal
                    </h5>

                    <h5>
                      ${orderList.reduce((acc, e) => acc + e.qty * e.price, 0)}
                    </h5>

                  </div>
                  <div className='delevery_fee summery_cx' >
                    <h5>
                      Delivery fee
                    </h5>
                    <h5>
                      free
                    </h5>
                  </div>
                  <div className='total_fee summery_cx' >
                    <h5>
                      <b>
                        Total
                      </b>
                    </h5>
                    <h5>
                      <b>
                        ${orderList.reduce((acc, e) => acc + e.qty * e.price, 0)}
                      </b>


                    </h5>
                  </div>
                </div>
                <Box sx={{ mt: 2 }} className='checkout_box' >
                  <Button block onClick={takeToTheCheckout} >
                    Go to checkout
                  </Button>
                </Box>
              </div>
            </React.Fragment>

        }


      </Drawer>
    </>
  );
};

export default App