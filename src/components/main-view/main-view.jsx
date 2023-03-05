import { useState, useEffect, Fragment } from "react";
import MovieCard from '../movie-card/movie-card'
import MovieView from '../movie-view/movie-view';
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";

const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser :  null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState(null);
  

  useEffect(() =>{
    if (!token) return;

    fetch('https://myflixx.herokuapp.com/api/v1/movies', 
    {
      
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then(({data}) =>{

        const result = data.map((element)=>{
            return {
                id: element._id,
                title: element.Title,
                genres: element.Genres,
                image: element.ImagePath,
                description: element.Description,
                actors: element.Actors
            }
        })
        setMovies(result);
    }).catch(err => console.log(err))
   
  }, [token])

  if (!user) {
    return(
      <Fragment>
         <LoginView 
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);

            }} 
          />
          or
          <hr />
          <SignupView />


      </Fragment>
     

    ) 
  }
    

if (selectedMovies) {
  return(
    <MovieView
     movie={selectedMovies} 
     onBackClick={()=> setSelectedMovies(null)} 
     />

  ) 
}

if(!movies) {
  return <div> The list is empty </div>;
}

  return (
         <Fragment>         
            <div className="center">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovies(newSelectedMovie);
                        }}
                    />
                ))}
                
            </div>
            <button onClick={() => {
               setUser(null); 
               setToken(null);
               localStorage.clear(); }}>
              Logout
            </button>
       </Fragment>
    );
  };

 export default MainView;