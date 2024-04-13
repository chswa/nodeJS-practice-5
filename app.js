const express = require('express')
const app = express()
const sqlite3 = require('sqlite3')
const path = require('path')
const {open} = require('sqlite')

const dbPath = path.join(__dirname, 'goodreads.db')

let db = null
const initilizeDBAndServer = async () => {
  try {
    db = await open({filename: dbPath, driver: sqlite3.Database})

    app.listen(3000, () => {
      console.log('Server Running')
    })
  } catch (e) {
    console.log(`DB Error:${e.message}`)
    process.exit(1)
  }
}

initilizeDBAndServer()

const covertMovieDbObjectToResponseObject = dbObject => {
  return {
    movieId: dbObject.movie_id,
    directorId: dbObject.director_id,
    movieName: dbObject.movie_name,
    leadActor: dbObject.lead_actor,
  }
}

//get movie names

app.get('/movies/', async (request, response) => {
  const getMovieNamesQuery = `SELECT movie_name FROM movie `

  const movieNamesArray = await db.all(getMovieNamesQuery)

  response.send(
    movieNamesArray.map(eachMovie => {
      movieName: eachMovie.movie_name
    }),
  )
})
