const url = "http://localhost:3000/"
const axios = require('axios').default;
require("dotenv").config()



// axios({
//     method: "post",
//     url: url + "auth/login",
//     data: {
//         username: process.env.TEST_USERNAME,
//         password: process.env.TEST_PASSWORD
//     },
//     withCredentials: true
// }).then(response => {
//     console.log(response.status, response.data)
//     return axios.get(url + "posts/", { withCredentials: true })
// }).then(response => {
//     console.log(response.status, response.data)
// }).catch(err => {
//     console.log(err)
// })


const instance = axios.create({
    baseURL: url,
    auth: {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD
    }
});
instance.defaults.withCredentials = true
instance.post("auth/login", {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD
}).then(response => {
    return instance.get("posts/", {
        headers: {
            Cookie: response.headers['set-cookie']
        }
    })
}).then(response => {
    console.log(response.status, response.data)
}).catch((error) => {
    console.log(error)
})

