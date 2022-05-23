import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from "antd"

import useAuth from '../../hook/useAuth'
import http, { authHeader } from '../../common/http-common.js'
import LoadingIcon from './LoadingIcon.jsx'

const DeleteButton = ( path ) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [ askConfirm, setAskConfirm ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ promtMsg, setpromtMsg ] = useState('')
  
  const deleteItem = () => {
    console.log('Deleting');
    setLoading(true)
    console.log(path[Object.keys(path)[0]])
    console.log(auth.username)
    console.log(auth.password)
    path = path[Object.keys(path)[0]]
    authHeader(auth.username, auth.password)
    http.delete(path)
    .then ((response) => {
      setLoading(false)
      setSuccess(true)
      console.log(response.data)
      setpromtMsg('Deleted Dog Successfully')
      setTimeout(() => {
        navigate('/', {replace: true});
      }, 3000);
    })
    .catch ((error) => {
      setLoading(false)
      setpromtMsg('Wrong Data, please try again')
      if(error.response) {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.header)
      }
    })
  }

  if (auth.role == 'worker') {
    return(
      <>
        {!askConfirm ? <Button type="danger" onClick={() => setAskConfirm(true)} >Delete</Button> :
        <Card>
          <p>Do you confirm to delete this dog?</p>
          { loading ? 
            <LoadingIcon /> 
            : 
            !success &&
            <>
              <Button type="danger" onClick={() => deleteItem()}>Confirm</Button>
              <Button onClick={() => setAskConfirm(false)}>No, Back</Button>
            </>
          }
          { promtMsg && <p>{promtMsg}</p> }
        </Card>
        }
      </>
    ) 
  } else {
    return <></>
  }
}

export default DeleteButton

