const url = "http://localhost:3000/"
const axios = require('axios').default;

describe("Get landing page", () => {
    test("correct url", async () => {
        const data = await axios.get(url)
        expect(data.status).toBe(200)
    })

    test("inncorrect url", async () => {
        try {
            const data = await axios.get("http://localhost:3001/")    
        } catch (err) {
            expect(err).toBeDefined()
        }
    })
})
