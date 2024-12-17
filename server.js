const express = require("express")
const app = express()
const axios = require("axios")
require("dotenv").config()

const methodOverride = require("method-override")
const morgan = require("morgan")

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.get("/weather", async (req, res) => {
  await res.render("weather/show.ejs")
})

app.post("/weather", async (req, res) => {
  const zipCode = req.body.zipCode
  const apiKey = process.env.API_KEY
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${apiKey}`

  axios({
    method: "get",
    url: weatherURL,
  })
    .then((response) => {
      const weatherData = response.data
      res.render("weather/show.ejs", { data: weatherData })
    })
    .catch((error) => {
      console.log(error)
      res.render("weather/error.ejs")
    })
})

app.listen(3000, () => {
  console.log("The app is currently running on port 3000")
})
