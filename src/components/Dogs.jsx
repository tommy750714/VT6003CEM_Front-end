import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { Button, Card, Col, Row } from "antd"

import useAuth from '../hook/useAuth'
import http from "../common/http-common"
import LoadingIcon from './utils/LoadingIcon'
import SearchBar from './utils/SearchBar'

  const CardLayout = {
  span: { xs: 24, sm: 12 , md: 8, lg: 6,  },
  margin: 10
}  

const Dogs = () => {
  
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true)
  const [Dogs, setDogs] = useState(null)
  
  useEffect(() => {
    http.get('/dogs')
    .then((response) => {
      setDogs(response.data)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
      setLoading(false)
    })
  },[])
  
  if(loading){
    return(<LoadingIcon />)
    } else {
        if(!Dogs){
      return(
        <div>There is No Dog Record available !!</div>
      )
    } else {
      return(
        <>
          { auth.role == 'worker' ? 
          <Button><Link to={`/dogs/add`} >Create a new dog record</Link></Button> :
            <></>
          }
          <SearchBar placeholder='Search something...' data={Dogs}/>
          <Row type="flex" justify="space-around">
            {
              Dogs && Dogs.map(({ id, name, breed }) => (
                <Col {...CardLayout} key={id}>
                  <Card title={name} style={{width: 300}} >
                    <p>{breed}</p>
                    <br/>
                    <Link to={`/dogs/${id}`} >Details</Link>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </>
      )
    }
  }
}

export default Dogs