import {Row, Col} from 'react-bootstrap'
import MovieCard from "../movie-card/movie-card";

const FavoriteMovies= ({favMovies, toggleFavMovies})=> {

    const handleToggle = (movie) => {
        toggleFavMovies(movie);
      };
    return(
        <Col md="10" className="m-5">
            {favMovies?(
                <Row>
                    <h3>Favorites movies list</h3>
                   {
                    favMovies.map((movie) =>(
                    <Col  md="4" className="mt-2" key={movie.id} >
                             <MovieCard movie={movie} toggleFavMovies={handleToggle}  />
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