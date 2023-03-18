import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Heart } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom'

 const MovieCard = ({movie, toggleFavMovies}) => {
  
  const handleFavClick = (event) => {
    event.preventDefault();
    toggleFavMovies(movie);
  };
  let circleClasses = "inline-block p-7 rounded-full w-20 mx-auto";
  let iconStyles = { color: "white", fontSize: "1.5em" };
    return ( 
      <Card className='m-3' >
        <Card.Img variant='top'  src={movie.image}/>
        <Card.Body>
        <Card.Title>{movie.title} 
        < Heart
         
        color='red'
        className={circleClasses}
        onClick={handleFavClick}
         
         
         /> 
        </Card.Title>
          <Link to={`/movies/${movie.id}`}>
          <Button variant='link'> Open</Button>
          </Link >
        </Card.Body>
      </Card>
    ) 
  };


  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      author: PropTypes.string,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    }).isRequired
  
  };
  export default MovieCard;