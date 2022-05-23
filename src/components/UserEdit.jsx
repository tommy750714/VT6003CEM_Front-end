import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, InputNumber, Button } from 'antd'

import useAuth from './../hook/useAuth';
import http, { authHeader } from './../common/http-common'
import LoadingIcon from './utils/LoadingIcon'
import BackButton from './utils/BackButton'

const formItemLayout = {
	labelCol: { xs: { span: 24 }, sm: { span: 6 } },
	wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};

const tailFormItemLayout = {
	wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 12, offset: 6 } }
};

const UserEdit = props => {
	const navigate = useNavigate();
	const { auth, setAuth } = useAuth();
  const [status, setStatus] = useState('Loading');
	const [userData, setUserData] = useState(null);
	const [promtMsg, setpromtMsg] = useState('');

	useEffect( async () => {
		setStatus('Loading');
    try {
      authHeader(auth.username, auth.password);
      console.log(`/${auth.role}s/${auth.id}`)
      const response = await http.get(`/${auth.role}s/${auth.id}`);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
    setStatus('Completed');
	}, []);

	const onFinish = async values => {
		setStatus('Submitting');
		const { confirm, ...data } = values;
    data.workerid = parseInt(data.workerid, 10);
    authHeader(auth.username, auth.password);
		try {
      const response = await http.put(`/${auth.role}s/${auth.id}`, data)
      setAuth({
        id: response.data.id,
        username: response.data.username,
        password: data.password,
        role: response.data.role
      });
      setStatus('Completed');
      setpromtMsg('Submitted successfully');
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 2500);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
			  console.log(error.response.status);
			  console.log(error.response.header);
      }
      setpromtMsg('Wrong Data, please try again');
      setStatus('Completed');
    }
	};
  
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

	if (status == 'Loading') {
		return <LoadingIcon />
	} else {
		if (userData) {
			return (
				<>
					<h1>Edit your information</h1>
					<Form
						{...formItemLayout}
						name="register"
						onFinish={onFinish}
						initialValues={{
              workerid: userData?.workerid ? `${userData.workerid}` : '',
							firstname: userData?.firstname ? `${userData.firstname}` : '',
              lastname: userData?.lastname ? `${userData.lastname}` : '',
              username: userData?.username ? `${userData.username}` : '',
              about: userData?.about ? `${userData.about}` : '',
              email: userData?.email ? `${userData.email}` : '' }}>
    				<Form.Item name="workerid" label="Worker ID" autoComplete="off" rules={workerIdRules}><InputNumber /></Form.Item>
            <Form.Item name="username" label="Username" autoComplete ="username" rules={userNameRules} ><Input /></Form.Item>
            <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback><Input.Password /></Form.Item>
            <Form.Item name="confirm" label="Confirm Password" rules={confrimPasswordRules} hasFeedback><Input.Password /></Form.Item> 
            <Form.Item name="firstname" label="First Name" rules={firstNameRules} hasFeedback><Input /></Form.Item>
            <Form.Item name="lastname" label="Last Name" rules={lastNameRules} hasFeedback><Input /></Form.Item>
            <Form.Item name="email" label="E-mail" rules={emailRules} hasFeedback><Input /></Form.Item>
    				<Form.Item {...tailFormItemLayout}>
      				{status == 'Submitting' ? 
                <LoadingIcon /> 
                : 
                <>
                  <Button type="primary" htmlType="submit">Submit</Button>
                  <BackButton path={'/dashboard'}/>
                </> }
    					{ promtMsg && <p>{promtMsg}</p> }
  					</Form.Item>
					</Form>
				</>
			)
		} else {
			return (
				<>
					<p>Cannot find the Worker Record</p>
					<BackButton path={'/dashboard'}/>
				</>
			)
		}
	}
}

export default UserEdit