import { useState, useEffect, Fragment } from "react";
import MovieCard from '../movie-card/movie-card'
import MovieView from '../movie-view/movie-view';
import LoginView from "../login-view/login-view";
import SignupView from "../signup-view/signup-view";
import ProfileView from "../profile-view/profile-view";
import NavigationBar from "../navigation-bar/navigation-bar";
import { Row, Col, Button, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [favMovies, setFavMovies] = useState([]);
  
  
  

  const toggleFavMovies = (movie) => {
    const index = favMovies.indexOf(movie);
    if (index > -1) {
      deleteFavMovies(movie);
      setFavMovies(
        favMovies.filter((favMovie) => favMovie.id !== movie.id)
      );
    } else {
      addFavMovies(movie);
      setFavMovies([...favMovies, movie]);
    }
  };
  
  const addFavMovies = (movie)=>{

     fetch(
            `http://localhost:5000/api/v1/users/${user.Username}/movies/${movie.id}`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    ).then(response => response.json()) 
     .catch(error => console.log(error))
    }

    const deleteFavMovies = (movie)=>{

      fetch(
             `http://localhost:5000/api/v1/users/${user.Username}/movies/${movie.id}`,{
             method: 'Delete',
             headers: {
                 Authorization: `Bearer ${token}`,
                 'Content-Type': 'application/json'
             }
         }
     ).then(response => response.json()) 
      .catch(error => console.log(error))
     }

  



  useEffect(() => {
    if (!token) return;
  
    const headers = { 
      Authorization: `Bearer ${token}`
    }
    const getUser = () =>{

      fetch(
             `http://localhost:5000/api/v1/users/${user.Username}`,{method: 'GET', headers}
     ).then(response => response.json())
       .then(({data: user}) =>{

        const result = user.FavoriteMovies.map((element)=>{
          return {
              id: element._id,
              title: element.Title,
              genres: element.Genres,
              image: element.ImagePath,
              description: element.Description,
              actors: element.Actors,
              director: element.Director,
          }
      })
        localStorage.setItem('user', JSON.stringify(user))
        setFavMovies(result)
  
       }) 
      .catch(error => console.log(error))
     }
   getUser()

  const fetchMovies =()=>{favMovies
    fetch('http://localhost:5000/api/v1/movies',{ headers })
      .then((response) => response.json())
      .then(({data}) =>{
          const result = data.map((element)=>{
              return {
                  id: element._id,
                  title: element.Title,
                  genres: element.Genres,
                  image: element.ImagePath,
                  description: element.Description,
                  actors: element.Actors,
                  director: element.Director,
              }
          })
          setMovies(result);
      }).catch(err => console.log(err))

}
    
fetchMovies();
  }, [token]);

  useEffect(()=>{
    const initFavMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie.id))
    setFavMovies(initFavMovies)
  },[user, token])

  const clearLocalStorage =()=>{
      setUser(null);
      setToken(null);
      localStorage.clear();
  }
 
    return(
      <BrowserRouter>
      <NavigationBar user={user}  onLoggedOut={clearLocalStorage} />
      <Container>
         <Routes>
            <Route
              exact
              path="/signup"
              element={
              <Fragment>
                {user ? (
                  <Navigate to="/" />
                ):(
                  <Col md={5}>
                    <SignupView/> 
                    </Col>
                )}
              </Fragment>
            }
        />

      <Route
         path="/login"
         element={
          <Fragment>
            {user ? (
              <Navigate to="/" />
            ):(
              <Col md={5}>
                <LoginView 
                onLoggedIn={
                  (user, token) =>{
                    setUser(user)
                    setToken(token)

                  }}/>
              </Col>
            )}
          </Fragment>
         }
      />

      <Route
        exact
        path="/movies/:movieId"
        element={
          <Fragment>
            {!user ? (
              <Navigate to="/login" replace />
            ):
              movies.length === 0 ? (
                <Col>The list is empty!</Col>
            ):(
              <Col md={8}>
                <MovieView movies={movies} toggleFavMovies={toggleFavMovies} />
              </Col>
            )}
          </Fragment>
            }
        />

        <Route
          path="/"
          element={
            <Fragment>
              {!user?(
                <Navigate to="/login" />
              ): movies.length === 0 ? (
                <Col>
                   Loading...
                </Col>
                
              ):(
                <Row gap={5} className="justify-content-center py5 mb5">
                    {movies.map((movie) => (
                    <Col lg={3} className="m-3" key={movie.id}>
                      <MovieCard
                          movie={movie}
                          toggleFavMovies={toggleFavMovies}
                      />
                    </Col>
                  ))}
                </Row> 
              )}
            </Fragment>
          }
        
        />
        <Route
        exact
        path="/profile"
        element={
          <Fragment>
            {!user?(
            <Navigate to="/login" />
            ):(
            <ProfileView 
            user={user} 
            token={token} 
            movies={movies} 
            favMovies={favMovies}
            toggleFavMovies={toggleFavMovies} />
            )
            
          
          }
            
          </Fragment>
     
        }
        
        
        />
        </Routes>
        </Container>
      </BrowserRouter>
      
    )
    
  };

 export default MainView;