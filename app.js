const express = require("express")
const session = require("express-session")
const expressHandlebars = require("express-handlebars")
const app = express()
const port = 3000
const auth = require("./routes/auth")
const home = require("./routes/home")
const posts = require("./routes/posts")
const connect = require("./dbServices/connect")
const passport = require("passport")

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var multer = require("multer")
var formDataParser = multer().none()
var urlencodedParser = bodyParser.urlencoded({extended: false})
var rawParser = bodyParser.raw()
var textParser = bodyParser.text()


var Cache = require("./services/cache")

console.log(`this is time of app.js ${Date.now()}`)

connect(() => {
    console.log("db connected, ready to accept commands")
})

app.use(session({ secret: process.env.SESSION_SECRET}))
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars')
app.use(passport.initialize());
app.use(passport.session())

app.use(jsonParser)
app.use(urlencodedParser)
app.use(formDataParser)


app.get("/", (req, res) => {
    res.render('landing')
})

app.use("/auth", auth);

app.use("/home", home);
app.use("/posts", posts);



app.listen(port, () => {
    console.log(`server listening to port ${port}`)
})