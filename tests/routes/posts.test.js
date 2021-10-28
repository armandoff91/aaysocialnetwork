const url = "http://localhost:3000/"
const axios = require('axios').default;
require("dotenv").config()
axios.defaults.withCredentials = true

describe("GET: posts", () => {
    test("no query", () => {
        const config = {
            method: 'post',
            url: url + "auth/login",
            data: {
                username: process.env.TEST_USERNAME,
                password: process.env.TEST_PASSWORD
            }
        }
        return axios(config)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.data).toStrictEqual({msg: "login success"})
                return axios({
                    method: 'get',
                    url: url + "posts/",
                    withCredentials: true
                })
            }).then((response) => {
                expect(response.status).toBe(200)
                expect(response.data).toStrictEqual({msg: "no post found"})
            })
    })
})
