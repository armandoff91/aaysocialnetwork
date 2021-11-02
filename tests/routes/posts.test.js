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
const postId = "617a8aca465bb62aa05e7ed4"

describe("GET: posts", () => {
    test("no query", async () => {
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

    test("with valid postId", async () => {
        const cookie = await axios(authConfig)
        .then(response => {
            return response.headers['set-cookie']
        })
        return axios.get(url + "posts/?postId=" + postId, {
            headers: {Cookie: cookie}
        }).then(response => {
            expect(response.status).toBe(200)
            expect(response.data).toHaveProperty("_id", postId)
            expect(response.data).toHaveProperty("body", "test post body")
        })
    })

    test("with invalid postId(correct length)", async () => {
        const cookie = await axios(authConfig)
        .then(response => {
            return response.headers['set-cookie']
        })
        return axios.get(url + "posts/?postId=617a8aca465bb62aa05e7ed2", {
            headers: {Cookie: cookie}
        }).then(response => {
            expect(response.status).toBe(200)
            expect(response.data).toHaveProperty("msg", "no post found")
        })
    })

    test("with invalid postId(incorrect length)", async () => {
        const cookie = await axios(authConfig)
        .then(response => {
            return response.headers['set-cookie']
        })
        return axios.get(url + "posts/?postId=1233123", {
            headers: {Cookie: cookie}
        }).catch(err => {
            expect(err).toBeDefined()
            expect(err.response.status).toBe(403)
        })
    })
})
