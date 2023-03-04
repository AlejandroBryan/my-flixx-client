import PropTypes from 'prop-types';
 
 const MovieView = ({ movie, onBackClick }) =>{
    return(
        < div>
            <div>
                <span >Title: </span>
                { movie.title }
            </div>
            <img src={movie.image} alt={movie.title} />
            <div>
                <span> Genres: </span>
               { movie.genres.map((genre) => <span key={genre.id}> { genre.Name } </span> )}
            </div>
            <div>
                
                <p>
                <span> Description: </span>
                   {movie.description}         
                </p>

            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )
    
}


MovieView.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      author: PropTypes.string,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };

export default MovieView;