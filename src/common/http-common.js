import axios from 'axios'
import { Buffer } from 'buffer'

export const http = axios.create({
  
  baseURL:'https://vt6003cemback-end.chengka.repl.co/api/v1/',
  headers:{
    'Content-type': 'application/json',
  }
})

const authHeader = (username, password) => {
  http.defaults.headers.common['Authorization'] = `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`
} 

export default http
export { authHeader }