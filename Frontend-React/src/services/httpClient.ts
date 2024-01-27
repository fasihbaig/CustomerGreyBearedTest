import axios, { CanceledError } from "axios";

export default axios.create({
    baseURL: `https://localhost:7282/api/`
})

export { CanceledError }