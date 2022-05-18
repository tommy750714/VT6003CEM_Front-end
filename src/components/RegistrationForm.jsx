import React from "react"; 
import { Form, Input, Button } from 'antd';

function onFinish(values){
  const {confirm, ...data} = values;
  console.log(values)
}


function RegistrationForm() {
  const formItemLayout = {  
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
    };
  const tailFormItemLayout = {   
    wrapperCol: { xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 6 } } 
    };
  const  emailRules = [ 
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!' } 
    ]; 
  








  
  return (
    <Form {...formItemLayout} name="register" onFinish={onFinish}>
      <Form.Item name="email" label="E-mail" rules="" ><Input /></Form.Item>
      <Form.Item name="password" label="Password" ><Input.Password /></Form.Item>
      <Form.Item name="confirm" label="Confirm Password" ><Input.Password /></Form.Item> 
      <Form.Item name="username" label="Username"><Input /></Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>    
  );    
}   

export default RegistrationForm; 