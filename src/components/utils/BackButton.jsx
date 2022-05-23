import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "antd"
import { RollbackOutlined } from '@ant-design/icons'

const BackButton = (event) => {
  const path = event?.path
  const navigate = useNavigate()
  const back = () => {
    console.log(`Start navigate to ${path ? path : '/'}`)
    navigate(path ? path : '/')
  }
  return <Button icon={<RollbackOutlined />} onClick={back} >Back</Button>
}

export default BackButton