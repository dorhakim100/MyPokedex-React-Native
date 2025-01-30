import { create } from 'apisauce'

const MY_IP = '192.168.1.237'
const BACKEND_PORT = 3030

const apiClient = create({
  baseURL: `http://${MY_IP}:${BACKEND_PORT}/api`,
})

export default apiClient
