 const MovieView = ({ movie, onBackClick }) =>{
    return(
        < div>
            <div>
                <span >title: </span>
                { movie.title }
            </div>
            <div>
                <span> genres: </span>
               {movie.genres.map((genre) => <span> { genre } </span> )}
            </div>
            <div>
                
                <p>
                <span> description: </span>
                   {movie.description}         
                </p>

            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )
    
}

export default MovieView;