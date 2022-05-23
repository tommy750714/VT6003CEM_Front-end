import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Button, Space } from "antd"

import useAuth from '../hook/useAuth'
import http from '../common/http-common.js'
import DeleteButton from './utils/DeleteButton'
import LoadingIcon from './utils/LoadingIcon'
import BackButton from './utils/BackButton'

const DogDetails = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(true);
  const [ dogData, setDogData ] = useState(null);

  useEffect(() => {
    setLoading(true)
    http.get(`/dogs/${id}`)
    .then((response, error) => {
      setDogData(response.data)
      setLoading(false)
    }).catch((error) =>{
      console.log(error)
      setLoading(false)
    })
  },[id])

  const editDogDetails = () => {
    navigate('edit') 
  }
  
	if (loading) {
    return(<LoadingIcon />)
  } else {
    if (dogData) {
      return (
        <>
          <h1>{dogData.name}</h1>
          <h2>{dogData.description}</h2>
          <p>Breed: {dogData.breed}</p>
          <p>Date of birth: {dogData.birthday}</p>
          <p>ID: {dogData.id}</p>
          { auth.role == 'worker' && 
            <div>
              <Space>
                <Button type="primary" onClick={ () => editDogDetails() }>Edit</Button>
                <DeleteButton path={`/dogs/${id}`} />
              </Space>
            </div> }
          <BackButton />
        </>
      )
    } else {
          return(
          <>
            <p>Cannot not found the dog</p>
            <BackButton path={'/'}/>
          </>
        )
      }
    }
}

export default DogDetails;