const express = require("express")
const expressHandlebars = require("express-handlebars")
const app = express()
const port = 3000
const auth = require("./routes/auth")
const home = require("./routes/home")

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars')

app.get("/", (req, res) => {
    res.render('landing')
})

app.use("/auth", auth);

app.use("/home", home)

app.listen(port, () => {
    console.log(`server listening to port ${port}`)
})