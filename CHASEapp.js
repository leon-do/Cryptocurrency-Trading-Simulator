// application

var express = require('express'),
    app = express(),
    setupPassport = require('./app/setupPassport'),
    flash = require('connect-flash'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    jsonParser = bodyParser.json()

var port = process.env.PORT || 8080

app.use(cookieParser())
app.use(session({ secret: '4564f6s4fdsfdfd', resave: false, saveUninitialized: false }))


app.use(flash())
app.use(function(req, res, next) {
    res.locals.errorMessage = req.flash('error')
    next()
});

app.use(jsonParser)
app.use(bodyParser.urlencoded({
  extended: true
}))

setupPassport(app)


// start app
app.listen(port)
console.log('Server started on port ' + port)

module.exports.getApp = app