import axios from 'axios'

function ApiRequest(access_token = false, fullURL = false, appNameHeader = true) {
  if (!access_token) {
    access_token = localStorage.getItem('access_token') || false
  }
  if (appNameHeader) {
    axios.defaults.headers.common['x-app-name'] = import.meta.env.VITE_APP_NAME
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
  }
  if (!fullURL) {
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
  }

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    async (err) => {
      if (err.response?.status !== 401) {
        return new Promise((resolve, reject) => {
          reject(err)
        })
      }
    },
  )

  return axios
}

export default ApiRequest
