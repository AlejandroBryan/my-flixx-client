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
               { movie.genres.map((genre) => <span> { genre } </span> )}
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

export default MovieView;