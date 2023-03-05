import { useState, useEffect, Fragment } from "react";
import MovieCard from '../movie-card/movie-card'
import MovieView from '../movie-view/movie-view';
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import { Row, Col, Button } from "react-bootstrap";

const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState(null);
  

  const getMovies =() =>{

    fetch('https://myflixx.herokuapp.com/api/v1/movies', 
    {
      
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then(({data}) =>{
      console.log(' dt', data);
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
   

  }

  useEffect(() => {
    if (!token) return;

    getMovies();

    
  }, [token])

 console.log(movies)
    return(
      <Row className="justify-content-md-center">
        {!user ? (
          <Fragment>
            <Col>
              <LoginView 
                onLoggedIn={(user, token) => {
                 setUser(user);
                 setToken(token);
                }} 
               />
               Or
              <SignupView />
            </Col>
          </Fragment>
        ): selectedMovies ?(
          <MovieView
            movie={selectedMovies} 
            onBackClick={()=> setSelectedMovies(null)} 
          />

        ): !movies && movies.length === 0 ?(
          <Col> The list is empty </Col>
        ): (
          <Fragment>         
            
                {movies.map((movie) => (
                  <Col key={movie.id} md={3} >
                    <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovies(newSelectedMovie);
                        }}
                    />
                    </Col>
                ))}
            <Button variant="warning" onClick={() => {
               setUser(null); 
               setToken(null);
               localStorage.clear(); }}>
              Logout
            </Button>
              
       </Fragment>
      )}
     
      </Row>  
    )
    
  };

 export default MainView;