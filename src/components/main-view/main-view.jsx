import { useState, useEffect, Fragment, useLayoutEffect } from "react";
import MovieCard from '../movie-card/movie-card'
import MovieView from '../movie-view/movie-view';

const MainView = () => {

  const [movies, setMovies] = useState([])
  useEffect(() =>{
    fetch('https://myflixx.herokuapp.com/api/v1/movies')
    .then((response) => response.json())
    .then(({data}) =>{
        console.log(data);
        const result = data.map((element)=>{
            return {
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

if(!movies) {
    return <div> The list is empty </div>;
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