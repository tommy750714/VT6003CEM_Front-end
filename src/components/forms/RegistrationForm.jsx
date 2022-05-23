import React, {useState} from "react"
import {useNavigate} from "react-router-dom"
import { Form, Input, Button, InputNumber } from "antd"

import http from '../../common/http-common'
import LoadingIcon from '../utils/LoadingIcon'

  const formItemLayout = {  
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
    }
  
  const tailFormItemLayout = {   
    wrapperCol: { xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 6 } } 
    }

const RegistrationForm = () => {

  const navigate = useNavigate()
  const [promtMsg, setpromtMsg] = useState('')
  const [status, setStatus] = useState('')
  

  const onFinish = (values) => {
    setStatus('Submitting')
  const {confirm, ...data} = values
  console.log(data)
  http.post('/workers', data)
    .then ((response) => {
      console.log(response.data)
      setStatus('Succeed')
      setpromtMsg('Submitted Successfully')
      setTimeout(() => {
        navigate('/login', {replace: true})
      }, 3000)
    })
    .catch ((error) => {
      if(error.response) {
        console.log(error.respone.header)
        console.log(error.respone.data)
        console.log(error.respone.status)
      }
      setStatus('Fail')
      setpromtMsg('Wrong Data, please try again')
    })
  }

//Start of Rules
    
  const workerIdRules = [
    {pattern : new RegExp(/^[0-9]+$/), message: 'Invalid Worker ID'},
    {required: true, message:'Please Input Your Worker ID'}
  ]
    
  const firstNameRules = [
    {required: true, message: 'Please Input Your First Name'}
  ]
    
  const lastNameRules = [
    {required: true, message: 'Please Input Your Last Name'}
  ]    
    
  const emailRules = [ 
    {type: 'email', message: 'Invalid E-mail!'},
    {required: true, message: 'Please Input Your E-mail' } 
    ]
    
  const userNameRules = [
    {required: true, message: 'Please Input Your Username', whitespace: true}
  ]

  const passwordRules = [
    {required: true, message: ' Please Input Your Password'}
  ]  
  const confrimPasswordRules = [
    {required: true, message: ' Please Confirm Your Password'},
    ({ getFieldValue }) => ({
      validator(rule, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve()
        }
          return Promise.reject('The Two Passwords Do Not Match')
      }
    })
  ]
  
// End of Rules
  
    return (
      <>
    <Form {...formItemLayout} name="register" onFinish={onFinish}>
      <Form.Item name="workerid" label="Worker ID" autoComplete="off" rules={workerIdRules}><InputNumber /></Form.Item>
      <Form.Item name="username" label="Username" autoComplete ="username" rules={userNameRules} ><Input /></Form.Item>
      <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback><Input.Password /></Form.Item>
      <Form.Item name="confirm" label="Confirm Password" rules={confrimPasswordRules} hasFeedback><Input.Password /></Form.Item> 
      <Form.Item name="firstname" label="First Name" rules={firstNameRules} hasFeedback><Input /></Form.Item>
      <Form.Item name="lastname" label="Last Name" rules={lastNameRules} hasFeedback><Input /></Form.Item>
      <Form.Item name="email" label="E-mail" rules={emailRules} hasFeedback><Input /></Form.Item>
      <Form.Item {...tailFormItemLayout}>
        {status == 'Submitting' || status == 'Succeed' ?
      <LoadingIcon /> :
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
        }
        {promtMsg && <p>{promtMsg}</p> }
      </Form.Item>
    </Form>
    </>
  )   
}

export default RegistrationForm