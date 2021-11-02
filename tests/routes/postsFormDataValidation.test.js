const url = "http://localhost:3000/"
const axios = require('axios').default;
require("dotenv").config()
axios.defaults.withCredentials = true

const authConfig = {
    method: 'post',
    url: url + "auth/login",
    data: {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD
    }
}

describe("POST: posts/ ", () => {
    test("newPost", async () => {
        const cookie = await axios(authConfig)
        .then(response => {
            return response.headers['set-cookie']
        }).catch(err => {
            console.log(err)
        })
        return axios.get(url + "posts", {
            headers: {
                Cookie: cookie
            }
        })
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.data).toStrictEqual({msg: "no post found"})
        })
    })
})