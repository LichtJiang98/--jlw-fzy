import axios from 'axios'

let requests = axios.create({
    baseURL:"/mock",
})

export default requests
