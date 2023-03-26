import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { HeartFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, isFavorites, toggleFavoritesMovies }) => {
   const handleFavClick = (event) => {
      event.preventDefault();
      toggleFavoritesMovies(movie);
   };

   return (
      <Card className="m-3">
         <Card.Img variant="top" src={movie.image} />
         <Card.Body>
            <>
               {isFavorites ? (
                  <HeartFill
                     color="red"
                     size={25}
                     className="float-end opacity-50"
                     type="button"
                     onClick={handleFavClick}
                  />
               ) : (
                  <HeartFill
                     color="currentColor"
                     size={25}
                     className="float-end opacity-50"
                     type="button"
                     onClick={handleFavClick}
                  />
               )}
            </>

            <Card.Title className="mr-5">{movie.title}</Card.Title>

            <Link to={`/movies/${movie.id}`}>
               <Button variant="link"> Open</Button>
            </Link>
         </Card.Body>
      </Card>
   );
};

MovieCard.propTypes = {
   movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      author: PropTypes.string,
      genre: PropTypes.shape({
         name: PropTypes.string.isRequired,
      }),
   }).isRequired,
};
export default MovieCard;
