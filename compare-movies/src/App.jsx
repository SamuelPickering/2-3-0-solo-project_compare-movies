import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import movieData from "./movie-data.json"
import BarChart from './components/BarChart'
import PieChart from './components/Piechart'
import ScatterPlot from './components/ScatterPlot'
// use assert maybe
function App() {
  const [movieDat, setMovieData] = useState(getMovies())
  function getMovies(){
    try {
      return JSON.parse(localStorage.getItem("movies")) || []
    } catch (error) {
      console.error(error)
      return null
    }

  }
  function logmov(){
    console.log( "logmov: " + movieDat)
  }
  function initMoviesIfEmpty(){
    let movies = getMovies()
    if(movies.length === 0){
      localStorage.setItem("movies" , JSON.stringify(movieData))
      setMovieData(getMovies())
      console.log("called set : " + movieDat)
    }
  }
  function resetMovies(){
    localStorage.removeItem("movies")
    initMoviesIfEmpty()
    console.log(getMovies())
  }
  function addMovie(movie){
    localStorage.setItem("movies", JSON.stringify([movie, ...getMovies()]))
    setMovieData(getMovies())
  }
  function handleSubmit(e){
    e.preventDefault()
    let form = e.target
    //"criticScore": 91, "audienceScore": 93, "domestic": 93277026,  "genre": "adventure", "title": "D&D" },
    let movie = {criticScore : form.critic.value, audienceScore : form.audience.value, domestic : form.domestic.value, genre : form.genre.value, title : form.title.value}
    addMovie(movie)
    console.log(getMovies())
  }
  useEffect(() => {
    initMoviesIfEmpty();
    console.log("movieDat: " + movieDat);
  }, []);
  
  
  console.log(movieData[0])
  return (
    <>
    <h1>2023's Top Domestic Movies</h1>
    <main>
      <div className='movies'>
        <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Movie Title: <input name="title"></input></label></div>
          <div className="form-group"><label>Critic Score: <input name= "critic"></input></label></div>
          <div className="form-group"><label>Audience Score: <input name = "audience"></input></label></div>
          <div className="form-group"><label>Domestic Gross Sales: <input name = "domestic"></input></label></div>
          {/* <div className="form-group"><label>Genre <input name = "genre"></input></label></div> */}
          <div className="form-group">    
          <label>Select an option:</label>
            <select name= "genre">
                <option value="action">action</option>
                <option value="adventure">adventure</option>
                <option value="comedy">comedy</option>
                <option value="documentary">documentary</option>
                <option value="drama">drama</option>
                <option value="concert">concert</option>
                <option value="horror">horror</option>
            </select>
    </div>
          <button type='submit'>Add movie</button>
         </form>
        </div>
        <div className='movies-container'>
          {movieDat.map((movie, index) => {
           return <div className='card' id='index'>
                      <h4>{movie.title}</h4>
                      <p>Critic Score: {movie.criticScore}</p>
                      <p>Audience score: {movie.audienceScore}</p>
                      <p>Domestic Total : ${movie.domestic.toLocaleString()}</p>
                      <p>Genre : {movie.genre}</p>
          
              </div>
          })}
          {console.log( "movieDat: " + movieDat)}
        </div>
        
        
      </div>
      <button style={{maxWidth : "400px"}} onClick={resetMovies}>Back to default</button>
      {/* <button onClick={logmov}>log moviedat</button> */}
      <div className="bar-con">
        <h3>Domestic Box Office</h3>
        <div style={{height : "700px"}}><BarChart chartData={movieDat}/></div>
        
      </div>
      <div className="circle-con">
        <div style={{height: "700px", display: "flex", justifyContent: "center"}}><PieChart chartData={movieDat}/></div>
      </div>
      <div className="plot-con">
        <div style={{height : "700px"}}><ScatterPlot chartData={movieData} /></div>
        
        {/* <p>plot stuff</p> */}
      </div>
    </main>
    </>
  )
}

export default App
