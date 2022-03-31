import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, useParams } from 'react-router'
import ShowSmallAlert from '../../components/SingleComponent/ShowSmallAlert';
import BackDropLoading from '../../components/SingleComponent/BackDropLoading';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '../../Graphql/Mutations/UserAuthentication'

import { Form, Input, Button, } from 'antd';
import { LockOutlined, } from '@ant-design/icons';
import { Grid } from '@mui/material';


export default function ResetPassword() {

    const { resetToken } = useParams()

    const [ResetPassword, { error, loading, data }] = useMutation(RESET_PASSWORD)

    const [buttonDisable, setButtonDisable] = React.useState(false)

    const navigate = useNavigate()

    const [message, setMessage] = React.useState({
        open: false,
        message: ''
    })

    const handleSubmit = async (value) => {

        const { password, confirmPassword } = value

        if (confirmPassword.length < 8 || password.length < 8) {
            setMessage({
                open: true,
                message: 'Your Password should be more then 8'
            })
            return;
        }
        if (confirmPassword !== password) {
            setMessage({
                open: true,
                message: `password don't same`
            })
            return;
        }

        try {
            setButtonDisable(true)
            ResetPassword({
                variables: {
                    resetToken,
                    adminResetPassword: password
                }
            })
        } catch (error) {
            setButtonDisable(false)
            setMessage({
                open: true,
                message: 'Error try to refresh'
            })
        }

    };


    useEffect(() => {
        if (data) {
            if (data.AdminResetPassword.success) {
                navigate("/user/login", {
                    replace: true,
                })
            } else {
                setMessage({
                    open: true,
                    message: data.AdminResetPassword.message
                })
            }
        }
        if (error) {
            setMessage({
                open: true,
                message: "error try to refresh"
            })
        }
    }, [data, error, navigate,])
    useEffect(() => {
        document.body.style.backgroundColor = 'white'
    }, [])

    return (

        <Container component="main" maxWidth="xs">

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset password
                </Typography>
                <Box sx={{ py: 4, width: "100%" }} >
                    <Form name="login_form"
                        className="login-form "
                        initialValues={{
                            size: "large",

                        }}
                        onFinish={handleSubmit}

                    >

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your confirm Password!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="confirm Password"
                            />
                        </Form.Item>



                        <Grid className='flex j-c-s-b' >
                            <Grid>
                                <Button type="primary" htmlType="submit" className="login-form-button" disabled={buttonDisable} >
                                    Keep changed
                                </Button>
                            </Grid>


                        </Grid>
                    </Form>
                </Box>
            </Box>
            <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />
            {loading && <BackDropLoading />}

        </Container>

    );
}