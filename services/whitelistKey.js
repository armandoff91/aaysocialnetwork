class WhitelistKey {
    constructor(key, data = {}) {
        this.data = data;
        this.key = key;
        this.generalRequirement = [];
        this.routeSpecficRequirement = {};
        this.generalRequirementStr = [];
        this.routeSpecificRequirementStr = {};
    }

    validateGeneralRequirement() {
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

    getGeneralRequirement() {
        return this.generalRequirementStr
    }

    addGeneralTypeRequirement(type) {
        if (typeof type != "string") {throw "type must be a string"}
        this.generalRequirement.push((typeof this.data[this.key]) === type)
        this.generalRequirementStr.push(`typeof ${this.key} equal to ${type}`)
    }

    addGeneralRequirement(item, operator, value) {
        this.generalRequirementStr.push(`${item} ${operator} ${value}`)
        switch(item) {
            case "value":
                switch(operator) {
                    case "equal to":    this.generalRequirement.push(this.data[this.key] === value);    break
                    case "less than":   this.generalRequirement.push(this.data[this.key] < value);  break
                    case "less than or equal to":   this.generalRequirement.push(this.data[this.key] <= value); break
                    case "greater than":    this.generalRequirement.push(this.data[this.key] > value); break
                    case "greater than or equal to": this.generalRequirement.push(this.data[this.key] >= value); break
                    case "not equal to": this.generalRequirement.push(this.data[this.key] != value); break
                    case "include": this.generalRequirement.push(this.data[this.key].includes(value)); break
                }
                break;
            case "length":
                switch(operator) {
                    case "equal to": this.generalRequirement.push(this.data[this.key].length === value); break
                    case "less than":   this.generalRequirement.push(this.data[this.key].length < value);   break
                    case "less than or equal to":  this.generalRequirement.push(this.data[this.key].length <= value);  break
                    case "greater than":   this.generalRequirement.push(this.data[this.key].length > value);   break
                    case "greater than or equal to":  this.generalRequirement.push(this.data[this.key].length >= value);  break
                    case "not equal to":  this.generalRequirement.push(this.data[this.key].length != value);  break
                }
                break;
        }
    }
}

module.exports = WhitelistKey