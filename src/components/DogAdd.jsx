import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

import useAuth from '../hook/useAuth'
import http, { authHeader } from '../common/http-common'
import LoadingIcon from './utils/LoadingIcon'
import BackButton from './utils/BackButton'

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
}

const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 6 } }
}

const DogAdd = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [ loading, setLoading ] = useState(true);
  const [ dogData, setDogData ] = useState(null);
  const [ promtMsg, setpromtMsg ] = useState('');
  const [ submitting, setSubmiting ] = useState(false);
  
  const onFinish = (values) => {
    setSubmiting(true)
    const {confirm, ...data} = values
    console.log(data)
    authHeader(auth.username, auth.password)
    http.post('/dogs', data)
    .then ((response) => {
      setpromtMsg('You are successfully to add a new dog. We will redirect you to it');
      setTimeout(() => {
        navigate(`/dogs/${response.data.id}`, {replace: true})
      }, 2500);
    })
    .catch ((error) => {
      setSubmiting(false)
      setpromtMsg('Something is wrong, please try again')
      if(error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.header)
      }
    })
  }
  // Start of Rules
  
  const DogNameRules = [
    { required: true, message:'Please Input a Dog Name' }
  ]
  
  const birthadyRules = [
    {type: 'date', message:'Please Input the Valid Date'},
  ]

  const breedRules = [
    {required: true, message: 'Please Input a Dog Breed'}
  ]

  // End of Rules
  return(
    <>
      <h1>Create a new dog record</h1>
      <Form {...formItemLayout} name="register" onFinish={onFinish} >
        <Form.Item name="name" label="Dog Name" rules={DogNameRules} hasFeedback autoComplete="off"><Input /></Form.Item>
        <Form.Item name="breed" label="Breed" hasFeedback rules={breedRules} hasFeedback><Input /></Form.Item>
        <Form.Item name="birthday" label="Birthday" rules={birthadyRules} hasFeedback><Input /></Form.Item>
        <Form.Item name="description" label="Description" ><Input.TextArea rows={5} /></Form.Item>
        <Form.Item {...tailFormItemLayout} >
          {submitting ?
            <LoadingIcon /> :
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
          }
          { promtMsg && <p>{promtMsg}</p> }
        </Form.Item>
      </Form>
      <BackButton path={'/'}/>
    </>
  )
}

export default DogAdd
