import axios from 'axios'
import ProductService from './services/product'
import AuthService from './services/auth'

function setAxiosConfig () {
  axios.defaults.baseURL = 'http://127.0.0.1:3001'
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    async function (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        return Promise.reject(error)
      }

      return Promise.reject(error)
    }
  )
}

setAxiosConfig()

const client = {
  products: ProductService(axios),
  auth: AuthService(axios)
}

function setAuth (token) {
  axios.defaults.headers.Authorization = token
}

export { client, setAuth }
