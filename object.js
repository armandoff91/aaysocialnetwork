var obj = {a: "a", b:"b", c:"c"}

for (var i in obj) {
    console.log(obj[i])
}

obj.d = "d"

console.log(obj)