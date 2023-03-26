import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Card, Button, Image, Row, Col } from 'react-bootstrap';
import { HeartFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import GenresView from './genres-view';


const MovieView = ({ movies, favoritesMovies, toggleFavoritesMovies }) => {
   const { movieId } = useParams();
   const movie = movies.find((m) => m.id === movieId);
   const isFavorites = favoritesMovies.some((favMovie) => favMovie.id === movie.id);

   const handleToggle = () => {
      toggleFavoritesMovies(movie);
   };
   
   return (
      <Row>
         <Col md={4} className="mt-5">
            <Image src={movie.image} alt={movie.title} fluid />
            <Link to={`/`}>
               <Button className="mt-3 w-100" variant="secondary">
                  Back
               </Button>
            </Link>
         </Col>

         <Col md={8}>
            <Card border="light" className="mt-5">
               <Card.Body>
                  <>
                     {isFavorites ? (
                        <HeartFill
                           color="red"
                           size={25}
                           className="float-end opacity-50"
                           type="button"
                           onClick={handleToggle}
                        />
                     ) : (
                        <HeartFill
                           color="currentColor"
                           size={25}
                           className="float-end opacity-50"
                           type="button"
                           onClick={handleToggle}
                        />
                     )}
                  </>
                  <Card.Title as="h1"> {movie.title} </Card.Title>
                  <GenresView genres={movie.genres} />
                  <Card.Text>
                     <span as="h5" style={{ display: 'block' }}>
                        Description:
                     </span>
                     {movie.description}
                  </Card.Text>
                  <h3 className="mt-4">Director</h3>
                  <Card.Text>
                     <span className="mt-2" style={{ display: 'block' }}>
                        Biography:
                     </span>
                     {movie.director.Biography}
                  </Card.Text>
                  <h4>Actors</h4>
                  {movie.actors.map((actor)=><span className='m-2'>{actor}</span>)}
               </Card.Body>
            </Card>
         </Col>
      </Row>
   );
};

MovieView.propTypes = {
   movies: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      director: PropTypes.shape({
         name: PropTypes.string.isRequired,
         biography: PropTypes.string,
      }),
      genres: PropTypes.shape({
         name: PropTypes.string.isRequired,
      }),
   }).isRequired,
   description: PropTypes.string,
};

export default MovieView;
