import axios from 'axios'

function ApiRequest(fullURL = false, appNameHeader = true) {
  if (appNameHeader) {
    axios.defaults.headers.common['x-app-name'] = import.meta.env.VITE_APP_NAME
  }
  if (!fullURL) {
    axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
  }

  axios.interceptors.response.use(
    (response) => {
      return response
    },
    async (err) => {
      if (err.response.status !== 401) {
        return new Promise((resolve, reject) => {
          reject(err)
        })
      }
    },
  )

  return axios
}

export default ApiRequest
