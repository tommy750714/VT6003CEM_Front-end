import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Layout, Space } from "antd"

import './App.css'

import Home from "./components/Home"
import DogDetails from "./components/DogDetails"
import DogAdd from "./components/DogAdd"
import DogEdit from "./components/DogEdit"
import Register from "./components/Register"
import LoginPage from "./components/LoginPage"
import Dashboard from "./components/Dashboard"
import UserEdit from "./components/UserEdit"
import NotFoundPage from "./components/NotFoundPage"

import LogoutBtn from './components/utils/LogoutButton'
import useAuth from './hook/useAuth'

const App = () => {
  const { Header, Content, Footer } = Layout;
  const { auth } = useAuth();
  
  return (
    <Router>
      <Header>
        <nav id='navbar'>
          <Space>
            <Link to="/">Home</Link>
            {auth.username?
              <> 
                <Link to="/dashboard">Dashboard</Link>
                <LogoutBtn /> 
              </> :
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            }
          </Space>
        </nav>
      </Header>
      <Content id='content'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/edit" element={<UserEdit />} />
          <Route exact path="/dogs/:id" element={<DogDetails />} />
          <Route path="/dogs/:id/edit" element={<DogEdit />} />
          <Route path="/dogs/add" element={<DogAdd />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Content>
      <Footer id='footer'>
        <Space>
          <p>VT6003CEM</p>
          {auth.username ? <p>Welcome {auth.username} ({auth.role})</p> : <p>Welcome Guest</p> }
        </Space>
      </Footer>
    </Router>
  )
}

export default App;