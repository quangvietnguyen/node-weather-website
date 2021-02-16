const request = require('request')

const forecast = (longtitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=77771b1a786faaa09aabf5ce7c02a914&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longtitude)

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.\n The humidity is ' + body.current.humidity + '% and there is ' + body.current.weather_descriptions[0] + ' outside.')
        }
    })
}

module.exports = forecast