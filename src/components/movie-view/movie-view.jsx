import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";
import {Card, Button, Badge, Col} from 'react-bootstrap'
import { HeartFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import { Fragment } from 'react';
import GenresView from './genres-view';

 const MovieView = ({ movies, favoritesMovies, toggleFavoritesMovies }) =>{
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const isFavorites = favoritesMovies.some(favMovie => favMovie.id === movie.id)

  const handleToggle= () => {
    toggleFavoritesMovies(movie);
  };

    return(
   
        <Card className="mt-5">
            <Card.Img variant='top' src={movie.image} alt={movie.title} />
            <Card.Body>
              
          <>
           {isFavorites ?(
               < HeartFill 
               color ='red' 
               size={25}
               className='float-end opacity-50'
               type='button'
               onClick={handleToggle}
               />
              ) :(

            < HeartFill 
            color ='currentColor' 
            size={25}
            className='float-end opacity-50'
            type='button'
            onClick={handleToggle}
            />
          )
          
         }
          </>
               <Card.Title>  {movie.title} </Card.Title>
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