import { useState, useEffect, Fragment, useLayoutEffect } from "react";
import MovieCard from '../movie-card/movie-card'
import MovieView from '../movie-view/movie-view';
const moviesData = [ {
    "id": 1,
    "title": "Beetlejuice",
    "year": "1988",
    "runtime": "92",
    "genres": [
        "Comedy",
        "Fantasy"
    ],
    "director": "Tim Burton",
    "actors": "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
    "description": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.",
    "poster": "https://www.themoviedb.org/t/p/w300/bzUFLxQHbfhPRAl0x213Nh3qgAW.jpg"
},

{
    "id": 2,
    "title": "Crocodile Dundee",
    "year": "1986",
    "runtime": "97",
    "genres": [
        "Adventure",
        "Comedy"
    ],
    "director": "Peter Faiman",
    "actors": "Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil",
    "description": "An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.",
    "poster": "https://www.themoviedb.org/t/p/w300/rfJk4cLBZeh4umhy8C20FHFlYOU.jpg"
},

{
    "id": 3,
    "title": "Ratatouille",
    "year": "2007",
    "runtime": "111",
    "genres": [
        "Animation",
        "Comedy",
        "Family"
    ],
    "director": "Brad Bird, Jan Pinkava",
    "actors": "Patton Oswalt, Ian Holm, Lou Romano, Brian Dennehy",
    "description": "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous restaurant.",
    "poster": "https://www.themoviedb.org/t/p/w300/t3vaWRPSf6WjDSamIkKDs1iQWna.jpg"

},
{
    "id": 4,
    "title": "Apocalypto",
    "year": "2006",
    "runtime": "139",
    "genres": [
        "Action",
        "Adventure",
        "Drama"
    ],
    "director": "Mel Gibson",
    "actors": "Rudy Youngblood, Dalia Hernández, Jonathan Brewer, Morris Birdyellowhead",
    "description": "As the Mayan kingdom faces its decline, the rulers insist the key to prosperity is to build more temples and offer human sacrifices. Jaguar Paw, a young man captured for sacrifice, flees to avoid his fate.",
    "poster": "https://www.themoviedb.org/t/p/w300/cBFQsU1LDBEOl0Ik0cygeB6wCLE.jpg"
},
{
    "id": 5,
    "title": "Scarface",
    "year": "1983",
    "runtime": "170",
    "genres": [
        "Crime",
        "Drama"
    ],
    "director": "Brian De Palma",
    "actors": "Al Pacino, Steven Bauer, Michelle Pfeiffer, Mary Elizabeth Mastrantonio",
    "description": "In Miami in 1980, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.",
    "poster": "https://www.themoviedb.org/t/p/w300/iQ5ztdjvteGeboxtmRdXEChJOHh.jpg"
},

{
    "id": 6,
    "title": "Django Unchained",
    "year": "2012",
    "runtime": "165",
    "genres": [
        "Drama",
        "Western"
    ],
    "director": "Quentin Tarantino",
    "actors": "Jamie Foxx, Christoph Waltz, Leonardo DiCaprio, Kerry Washington",
    "description": "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
    "poster": "https://www.themoviedb.org/t/p/w300/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg"
 
}]

const MainView = () => {

  const [movies, setMovies] = useState([])
  useEffect(() =>{
    fetch('https://myflixx.herokuapp.com/api/v1/movies')
    .then((response) => response.json())
    .then(({data}) =>{
        console.log(data.data);
        const result = data.map((element)=>{
            return{
                id: element._id,
                title: element.Title,
                genres: element.Genres,
                image: element.ImagePath,
                description: element.Description,
                actors: element.Actors
            }
        })
        setMovies(result);
    }).catch(err => console.log(err))
   
  }, [])

const [selectedMovies, setSelectedMovies] = useState(null);


if (selectedMovies) {
  return(
    <MovieView movie={selectedMovies}  onBackClick={()=> setSelectedMovies(null)} />

  ) 
}
 console.log(movies)

    return (
         <Fragment>         
            <div className="center">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovies(newSelectedMovie);
                        }}
                    />
                ))}
            </div>
       </Fragment>
    );
  };

 export default MainView;