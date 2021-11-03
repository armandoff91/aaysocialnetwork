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

const p = new Promise((res, rej) => {
    res("a")
})

// describe("sample, trying to write a async test properly", () => {
//     test("", async () => {
//         p.then(data => expect(data).toBe("b")).catch(err => {console.log(err)})
//     })
// })

// its a Promise problem, not axios problem

test("sample", async () => {
    var promise = axios(authConfig)
    .then(res => {
        return axios.post(url + "posts/newPost" , {
            body: "hello world 3"
        }, {
            headers: {
                Cookie: res.headers['set-cookie']
            }
        }).catch(err => {
            console.log(err)
        })
    })
    await expect(promise).resolves.toHaveProperty("status", "403")
    // expect(result.status).toBe(200)
    // await expect(promise).rejects.toThrow("403")
    // expect(newPost.status).toBe(403)
    // console.log(newPost.data)
})
