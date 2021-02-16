const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Viet Nguyen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page.',
        name: 'Viet Nguyen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page.',
        name: 'Viet Nguyen'
    })
})
// app.com
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.com/help
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Viet',
//         age: 28 
//     })
// })

// app.com/about
// app.get('/about', (req, res) => {
//     res.send('<h1>This is an about page.</h1>')
// })

// aa.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a location!'
        })
    }
    geocode(req.query.address, (error, { latitude, longtitude, location} = {} ) => {
        if (error) {
            return res.send({error})
        } 
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location: req.query.address,
                weather: forecastData,location
            })
        })
    })    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        text: 'Help article not found',
        name: 'Viet Nguyen'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        text: 'Page not found',
        name: 'Viet Nguyen'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})