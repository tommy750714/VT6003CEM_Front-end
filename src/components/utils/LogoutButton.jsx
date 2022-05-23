import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, } from "antd"

import useAuth from '../../hook/useAuth'

const LogoutButton = () => {
  const { setAuth } = useAuth()
  const navigate = useNavigate()

  const logout = () => {
    console.log('Logouting')
    setAuth({})
    navigate('/')
  }

  return(
      <Button type="link" onClick={()=> logout()}>Logout</Button>

  )
}
export default LogoutButton