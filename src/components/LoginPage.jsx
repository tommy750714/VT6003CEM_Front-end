import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from "antd"

import useAuth from '../hook/useAuth'
import http, { authHeader } from '../common/http-common'
import LoadingIcon from './utils/LoadingIcon.jsx'
import BackButton from './utils/BackButton.jsx'


const LoginPage = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting ] = useState(false)
  const [loginMessage, setLoginMessage] = useState(null)

  const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
}

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 6 } }
}

  const onFinish = (values) => {
    setSubmitting(true)
    
    const username = values.username
    const password = values.password
    
    console.log(`${username}:${password}`)
    
    authHeader(username, password)
    
    http.post('/users/login')
    .then ( (response) => {
      setAuth({
        id: response.data.id,
        username: response.data.username,
        password: password,
        role: response.data.role
      });
      setSubmitting(false)
      setLoginMessage('Login successfully')
      setTimeout(() => {
        navigate(-1, {replace: true})
      }, 3000)
    })
    .catch ((error) => {
      setSubmitting(false)
      if (error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.header)
        if (error.response.status == 401) {
          setLoginMessage('Username or password is incorrect')
        } else {
          setLoginMessage('Error, please try again')
        }
      }
    })
  }

  const usernameRules = [
    {required: true, message: 'Please Input Your Username', whitespace: true}
  ]

  const passwordRules = [
    {required: true, message: 'Please Input Your Password'}
  ]
  
	return (
    <>
			<h1>LoginPage</h1>
      <Form {...formItemLayout} name="register" onFinish={onFinish}>
        <Form.Item name="username" label="Username" autoComplete="username" rules={usernameRules}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" hasFeedback rules={passwordRules}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout} >
          { auth.username || submitting ? <></> :
            <Button type="primary" htmlType="submit">
            Login
          </Button>
          }
        </Form.Item>
        { submitting ? <LoadingIcon /> : <p>{ loginMessage }</p> }
      </Form>
      <BackButton path={'/'}/>
    </>
	);
}

export default LoginPage