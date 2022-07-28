import axios from 'axios'

// axios.defaults.timeout = 20000;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// POST传参序列化
axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});
// code状态码
axios.interceptors.response.use((res) => {
  return res.data;
}, (error) => {
  return Promise.reject(error);
});

function fetch(options) {
  options = options || {}
  return axios(options)
}

export default fetch;