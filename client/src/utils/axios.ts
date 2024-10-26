import axios from "axios"

const baseURL = import.meta.env.VITE_PARLAY_PRO_API;
const axiosInstance = axios.create({
    headers: {
        'Accepts': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    baseURL: "/api"
})

export default axiosInstance