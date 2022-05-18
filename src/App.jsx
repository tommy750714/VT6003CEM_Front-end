import React from 'react';
import './App.css';
import {Layout, Space} from 'antd';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
//import {Card, Button, DatePicker} from 'antd';
//import Hello from './components/Hello';
//import Goodbye from './components/Goodbye';
//import CardView from './components/CardView';
import Home from './components/Home';
import About from './components/About';
import Dashboard from './components/Dashboard';
import DetailArticle from './components/DetailArticle';
import Register from './components/Register';

//let counter = 0;

//function displayDate(date, dateString){
//  console.log(date, dateString);
//}

//function doSomething(event) {
//   console.log(counter++);
//}

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Header>
          <nav>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/About">About</Link>
              <Link to="/Dashboard">Dashboard</Link>
              <Link to="/Register">Register</Link>
            </Space>
          </nav>
      </Header>
      <Content>
        <Routes>
          <Route exact path ="/" element={ <Home /> } />
          <Route path ="/About" element={ <About /> } />
          <Route path ="/Dashboard" element={ <Dashboard /> } />
          <Route path ="/a/:aid" element={ <DetailArticle /> } />
          <Route path ="/Register" element={ <Register /> } />
          <Route path = "*" element={<p>404 Not Found</p>} />
        </Routes>
      </Content>
      <Footer>
           <p>xxx</p>
      </Footer>
    </Router>
    /* <div>
      <Hello name="Hello! Web API Development" />
      <Card title="Default Card" style={{width: 400, color: 'Blue'}}>
        <p>Card Content</p>
        <p>Card Content</p>
        <p>Card Content abcdefg</p>
      </Card>
      <br />
      <Button type="pirmary" onClick={doSomething}>Button </Button>
      <Button type="danger">Button </Button>
      <br />
      <DatePicker onChange={displayDate} />
      <p> </p>
      <Goodbye name="Yoda"/>
    </div> */

    // <CardView />
  );
}

export default App;