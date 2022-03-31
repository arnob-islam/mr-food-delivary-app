import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { Link, } from 'react-router-dom';
import ShowSmallAlert from '../SingleComponent/ShowSmallAlert';
import BackDropLoading from '../SingleComponent/BackDropLoading';
import { useMutation } from '@apollo/client';
import { FORGET_PASSWORD } from '../../Graphql/Mutations/UserAuthentication'

import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { Form, Input, Button, } from 'antd';



export default function ForgetPassword() {

    const [message, setMessage] = React.useState({
        open: false,
        message: ''
    })

    const [SendResetToken, { error, loading, data }] = useMutation(FORGET_PASSWORD)

    const handleSubmit = async (value) => {

        const { email } = value

        try {
            if (!email) return
            SendResetToken({
                variables: {
                    email
                }
            })
        } catch (error) {
            setMessage({
                open: true,
                message: "something error! Refresh the page"
            })
        }

    };

    useEffect(() => {
        if (data) {
            if (data.forgetPassword.success) {
                setMessage({
                    open: true,
                    message: data.forgetPassword.message
                })
            } else {
                setMessage({
                    open: true,
                    message: data.forgetPassword.message
                })
            }
        }
        if (error) {
            setMessage({
                open: true,
                message: "error try to refresh"
            })
        }
    }, [data, error])
    useEffect(() => {
        document.body.style.backgroundColor = 'white'
    }, [])

    return (
        <>
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
                    <Typography component="h2" variant="h5" >
                        Forget password
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
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                            >
                                <Input prefix={<MailOutlineIcon className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>


                            <Grid className='flex j-c-s-b' >
                                <Grid>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Reset password
                                    </Button>
                                </Grid>
                                <Box >
                                    <Link to="/user/login" className="c-white" >
                                        login
                                    </Link>
                                </Box>

                            </Grid>
                        </Form>
                    </Box>
                </Box>
                <ShowSmallAlert open={message.open} setClose={setMessage} message={message.message} />
                {loading && <BackDropLoading />}
            </Container>
        </>
    );
}