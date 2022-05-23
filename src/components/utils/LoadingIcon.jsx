import React from 'react'
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

const LoadingIcon = () => {
  const loadingIcon = <LoadingOutlined spin />
  return <Spin indicator={loadingIcon} />
}

export default LoadingIcon