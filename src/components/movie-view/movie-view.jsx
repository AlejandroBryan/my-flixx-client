import PropTypes from 'prop-types';
import {Card, Button, Badge} from 'react-bootstrap'

 const MovieView = ({ movie, onBackClick }) =>{
    return(
        <Card>
            <Card.Img src={movie.image} alt={movie.title} />
            <Card.Body>
               <Card.Title> Title : { movie.title } </Card.Title>
               {
                movie.genres &&
                'Genres :'
               }
              
               {
               
               movie.genres &&
                  movie.genres.map((genre) => <Badge key={genre._id} className="mx-1">{genre.Name} </Badge>)
              
                }
                <Card.Text>  
                 {movie.description}         
                </Card.Text>
                <Button variant="primary" onClick={onBackClick}>Back</Button>
            </Card.Body>
        </Card>
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