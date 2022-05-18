import axios from 'axios'

export default axios.create({
  baseURL:'https://BscComBlogSample.chengka.repl.co/api/v1',
  headers:{
    'Content-type': 'application/json'
  }
})