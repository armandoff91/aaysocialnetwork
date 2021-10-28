const url = "http://localhost:3000/"
const postId = "617a8aca465bb62aa05e7ed4"
const axios = require('axios').default;
require("dotenv").config()

const config = {
    method: "post",
    url: url + "auth/login",
    data: {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD
    }
}

async function getPosts() {
    const cookie = await axios(config)
    .then(response => {
        return response.headers['set-cookie']
    }).catch(err => {
        console.log(err)
    })
    axios.get(url + "posts/", {
        headers: {
            Cookie: cookie
        }
    }).then(response => {
        console.log(response.status, response.data)
    }).catch(err => {
        console.log(err.response.status)
    })
}

getPosts()
