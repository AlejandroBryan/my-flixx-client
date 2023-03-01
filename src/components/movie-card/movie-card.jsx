import PropTypes from 'prop-types';

 const MovieCard = ({movie, onMovieClick}) => {
  
    return ( 
      <div
        onClick={() => {
          onMovieClick(movie);
       }}
      >
        {movie.title}
      </div>
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
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };
  export default MovieCard;