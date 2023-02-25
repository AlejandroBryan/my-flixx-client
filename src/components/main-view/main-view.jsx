import { useState, useEffect, Fragment } from "react";
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
    "description": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house."
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
    "description": "An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City."
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
    "description": "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous restaurant."

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
    "description": "As the Mayan kingdom faces its decline, the rulers insist the key to prosperity is to build more temples and offer human sacrifices. Jaguar Paw, a young man captured for sacrifice, flees to avoid his fate."
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
    "description": "In Miami in 1980, a determined Cuban immigrant takes over a drug cartel and succumbs to greed."
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
    "description": "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner."
 
}]

const MainView = () => {

  const [movies, setMovies] = useState(moviesData)

const [selectedMovies, setSelectedMovies] = useState(null);

if (selectedMovies) {
  return(
    <MovieView movie={selectedMovies}  onBackClick={()=> setSelectedMovies(null)} />

  ) 
}
 

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