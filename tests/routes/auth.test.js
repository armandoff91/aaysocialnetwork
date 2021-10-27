const url = "http://localhost:3000/"
const axios = require('axios').default;
require('dotenv').config()


test("login in with correct password & username", () => {
    const config = {
        method: 'post',
        url: url + "auth/login",
        data: {
            username: process.env.TEST_USERNAME,
            password: process.env.TEST_PASSWORD
        }
    };
    return axios(config)
        .then(response => {
            expect(response.status).toBe(200)
            expect(response.data).toStrictEqual({msg: "login success"})
        })
})

test("login in with wrong password, correct username", () => {
    const config = {
        method: 'post',
        url: url + "auth/login",
        data: {
            username: process.env.TEST_USERNAME,
            password: "JHHKDHKHVV"
        }
    }
    return axios(config)
        .catch(error => {
            expect(error).toBeDefined()
            expect(error.response.status).toBe(401)
        })

})