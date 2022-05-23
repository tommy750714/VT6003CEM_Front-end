import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Space } from "antd"

import useAuth from '../hook/useAuth'
import http, { authHeader } from '../common/http-common'
import LoadingIcon from './utils/LoadingIcon'
import BackButton from './utils/BackButton'

const Dashboard = () => {
  
  const { auth } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()
  const [ loading, setLoading ] = useState(true)
  const [ userData, setUserData ] = useState(null)

  useEffect(() => {
    setLoading(true)
    authHeader(auth.username, auth.password)
    http.get(`/${auth.role}s/${auth.id}`)
    .then((response, error) => {
      setUserData(response.data)
      setLoading(false)
    }).catch((error) =>{
      console.log(error)
      setLoading(false)
    })
  },[auth])
  
	if (loading) {
    return(<LoadingIcon />)
  } else {
    if (userData) {
      return (
        <>
          <h1>Username: {userData?.username}</h1>
          <h2>Role: {userData?.role}</h2>
          <p>Name: {userData?.firstname} {userData.lastname}</p>
          <p>Email: {userData?.email}</p>
          <p>About: {userData?.about}</p>
          <p>ID: {userData?.id}</p>
          <p>Worker ID: {userData?.workerid}</p>
          <Button type="primary" ><Link to="/dashboard/edit">Edit</Link>
          </Button>
          <BackButton />
        </>
      )
    } else {
          return(
          <>
            <p>Cannot not found your information</p>
            <BackButton path={'/'}/>
          </>
        )
      }
    }
  }



export default Dashboard