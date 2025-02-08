import axios from "axios"

// const BASE_URL = 'http://localhost:3333'

export default axios.create({
    baseURL: "http://localhost:3031",
    headers: {
        'Content-Type': 'application/json',
    },
})

