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
    test("newPost: reject invalid form data key", async () => {
        // const cookie = await axios(authConfig)
        // .then(response => {
        //     return response.headers['set-cookie']
        // }).catch(err => {
        //     console.log(err)
        // })
        return axios(authConfig)
        .then(response => {
            response.headers['set-cookie']
        })
        .then(cookie => {
            return axios.post(url + "posts/newPost", {
                headers: {
                    Cookie: cookie
                },
                data: {
                    invalidKey1: "value"
                }
            })
            .then(res => {
                expect(res.data).toStrictEqual({ msg: 'please login.'})
                return res
            })
            .catch(err => {
                console.log(err)
                expect(err).toBeDefined()
                expect(err.response.status).toBe(403)
            })
            .finally(whatever => {
                console.log(whatever)
            })
        })
    })
})