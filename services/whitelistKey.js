class WhitelistKey {
    constructor(key, data = {}) {
        this.data = data;
        this.key = key;
        this.generalRequirement = [];
        this.routeSpecficRequirement = [];
    }

    validateGeneralRequirement() {
        console.log(this.generalRequirement)
        return this.generalRequirement.length != 0 ? this.generalRequirement.reduce((prev, curr) => prev && curr) : true
    }

    validateRouteSpecificRequirement() {
        var verdict = true
        return verdict
    }

    validate() {
        var verdict = true
        return verdict
    }

    addGeneralTypeRequirement(type) {
        if (typeof type != "string") {throw "type must be a string"}
        this.generalRequirement.push((typeof this.data[this.key]) === type)
    }

    addGeneralRequirement(item, operator, value) {
        switch(item) {
            case "value":
                switch(operator) {
                    case "===": this.generalRequirement.push(this.data[this.key] === value);    break
                    case "<":
                    case "<=":
                    case ">":
                    case ">=":
                    case "!=":
                }
                break;
            case "length":
                switch(operator) {
                    case "===": this.generalRequirement.push(this.data[this.key].length === value); break
                    case "<":   this.generalRequirement.push(this.data[this.key].length < value);   break
                    case "<=":  this.generalRequirement.push(this.data[this.key].length <= value);  break
                    case ">":   this.generalRequirement.push(this.data[this.key].length > value);   break
                    case ">=":  this.generalRequirement.push(this.data[this.key].length >= value);  break
                    case "!=":  this.generalRequirement.push(this.data[this.key].length != value);  break
                }
                break;
        }
    }
}

module.exports = WhitelistKey