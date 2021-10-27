const liveUrl = "https://aaysocialnetwork.com"
const url = "http://localhost:3000/"
const axios = require('axios').default;

describe("Get landing page", () => {
    test("correct url", () => {
        return axios.get(url)
            .then(response => {
                expect(response.status).toBe(200)
            })
    })
})
