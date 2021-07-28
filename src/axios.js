import axios from 'axios'

const instance = axios.create({
  baseURL : 'https://discord-backend-mern.herokuapp.com'
})

export default instance;