import React from 'react'
import RegistrationForm from './forms/RegistrationForm'
import BackButton from './utils/BackButton'

const Register = () => {
  return (
    <div>
    <h1>Register</h1>
    <RegistrationForm />
    <BackButton path={'/'}/>
    </div>  
  )
}

export default Register;