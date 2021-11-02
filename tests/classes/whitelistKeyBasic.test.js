const WhitelistKey = require("../../services/whitelistKey")

test("WhitelistKey contain key", () => {
    var sampleKey = new WhitelistKey("sampleKey")
    expect(sampleKey).toHaveProperty("key", "sampleKey")
})

test("WhitelistKey contain data", () => {
    const sampleData = {
        sampleKey : "HelloWorld"
    }
    var sampleKey = new WhitelistKey("sampleKey", sampleData)
    expect(sampleKey).toHaveProperty("data", sampleData)
})

test("WhitelistKey contain generalRequirement", () => {
    var sampleKey = new WhitelistKey("sampleKey")
    expect(sampleKey).toHaveProperty("generalRequirement", [])
})

test("WhitelistKey contain routeSpecficRequirement", () => {
    var sampleKey = new WhitelistKey("sampleKey")
    expect(sampleKey).toHaveProperty("routeSpecficRequirement", {})
})

test("validateGeneralRequirement: empty Req", () => {
    var sampleKey = new WhitelistKey("sampleKey")
    expect(sampleKey.validateGeneralRequirement()).toBe(true)
})

test("validateRouteSpecificRequirement: empty Req", () => {
    var sampleKey = new WhitelistKey("sampleKey")
    expect(sampleKey.validateRouteSpecificRequirement()).toBe(true)
})

test("validate(): empty Req", () => {
    var sampleKey = new WhitelistKey("sampleKey")
    expect(sampleKey.validate()).toBe(true)
})

test("getGeneralRequirement: 1 requirement", () => {
    const sampleData = {
        sampleKey: "abcdef"
    }
    var sampleKey = new WhitelistKey("sampleKey", sampleData)
    sampleKey.addGeneralRequirement("value", "equal to", "abc")
    sampleKey.addGeneralTypeRequirement("string")
    expect(sampleKey.getGeneralRequirement()).toStrictEqual(["value equal to abc", "typeof sampleKey equal to string"])
})