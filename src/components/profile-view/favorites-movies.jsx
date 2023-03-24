import {Row, Col} from 'react-bootstrap'
import MovieCard from "../movie-card/movie-card";

const FavoriteMovies= ({favoritesMovies, toggleFavoritesMovies})=> {

    const handleToggle = (movie) => {
        toggleFavoritesMovies(movie);
      };
    return(
        <Col md="10" className="m-5">
            {favoritesMovies?(
                <Row>
                    <h3>Favorites movies list</h3>
                   {
                    favoritesMovies.map((movie) =>(
                    <Col  md="4" className="mt-2" key={movie.id} >
                             <MovieCard movie={movie} isFavorites={favoritesMovies.includes(movie)} toggleFavoritesMovies={handleToggle}  />
                    </Col> 
                         ))}
                </Row>  
            ):(
                <Col><h3>Favorites movies is empty</h3></Col>
            ) } 
         </Col>                             
    )

}

export default FavoriteMovies;