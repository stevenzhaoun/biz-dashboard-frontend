import axios from "axios";

const client = axios.create({
    baseURL: "https://eab6-142-116-176-161.ngrok-free.app"
})

export default client