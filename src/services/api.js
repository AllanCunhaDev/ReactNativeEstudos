import axios from "axios";
// json-server --watch -d 180 --host 192.168.1.66 db.json

const Api = axios.create({
    baseURL: " http://192.168.1.66:3000"
})

export default Api