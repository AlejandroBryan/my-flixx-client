import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import {Card, Button, Badge, Col} from 'react-bootstrap'
import { Heart } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import { Fragment } from 'react';
import GenresView from './genres-view';

 const MovieView = ({ movies, toggleFavMovies }) =>{
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const handleToggle= () => {
    toggleFavMovies(movie);
  };
    return(
   
        <Card className="mt-5">
            <Card.Img variant='top' src={movie.image} alt={movie.title} />
            <Card.Body>
               <Card.Title> { movie.title } <Heart onClick={handleToggle} /> </Card.Title>
               <GenresView genres={movie.genres}/>
                <Card.Text>  
                 {movie.description}         
                </Card.Text>
                <Link to={`/`}>
                <Button variant="primary">Back</Button>
                </Link>
                
            </Card.Body>
        </Card>
    )
    
}


MovieView.propTypes = {
    movies: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      author: PropTypes.string,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    }).isRequired,
    description: PropTypes.string,
   
  };

export default MovieView;