import { useState, useEffect, Fragment } from 'react';
import { API } from '../../utils';
import SearchBox from './search-box';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import SignupView from '../signup-view/signup-view';
import ProfileView from '../profile-view/profile-view';
import NavigationBar from '../navigation-bar/navigation-bar';
import { Row, Col, Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const MainView = () => {
   const storedUser = JSON.parse(localStorage.getItem('user'));
   const storedToken = localStorage.getItem('token');
   const [movies, setMovies] = useState([]);
   const [user, setUser] = useState(storedUser ? storedUser : null);
   const [token, setToken] = useState(storedToken ? storedToken : null);
   const [favoritesMovies, setFavoritesMovies] = useState([]);
   const [searchField, setSearchField] = useState('');

   const toggleFavoritesMovies = (movie) => {
      const index = favoritesMovies.indexOf(movie);
      if (index > -1) {
         deleteFavoritesMovies(movie);
         setFavoritesMovies(favoritesMovies.filter((favMovie) => favMovie.id !== movie.id));
      } else {
         addFavoritesMovies(movie);
         setFavoritesMovies([...favoritesMovies, movie]);
      }
   };

   const addFavoritesMovies = (movie) => {
      fetch(`${API}/users/${user.Username}/movies/${movie.id}`, {
         method: 'POST',
         mode: 'no-cors',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
      })
         .then((response) => response.json())
         .catch((error) => console.log(error));
   };

   const deleteFavoritesMovies = (movie) => {
      fetch(`${API}/users/${user.Username}/movies/${movie.id}`, {
         method: 'Delete',
         mode: 'no-cors',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
      })
         .then((response) => response.json())
         .catch((error) => console.log(error));
   };

   useEffect(() => {
      if (!token) return;

      const headers = {
         Authorization: `Bearer ${token}`,
      };
      const getUser = () => {
         fetch(`${API}/users/${user.Username}`, { method: 'GET', mode: 'no-cors', headers })
            .then((response) => response.json())
            .then(({ data: user }) => {
               const result = user.FavoriteMovies.map((element) => {
                  return {
                     id: element._id,
                     title: element.Title,
                     genres: element.Genres,
                     image: element.ImagePath,
                     description: element.Description,
                     actors: element.Actors,
                     director: element.Director,
                  };
               });
               localStorage.setItem('user', JSON.stringify(user));
               setFavoritesMovies(result);
            })
            .catch((error) => console.log(error));
      };
      getUser();

      const fetchMovies = () => {
         favoritesMovies;
         fetch(`${API}/movies/`, {
            mode: 'no-cors',
            headers,
         })
            .then((response) => response.json())
            .then(({ data }) => {
               const result = data.map((element) => {
                  return {
                     id: element._id,
                     title: element.Title,
                     genres: element.Genres,
                     image: element.ImagePath,
                     description: element.Description,
                     actors: element.Actors,
                     director: element.Director,
                  };
               });
               setMovies(result);
            })
            .catch((err) => console.log(err));
      };

      fetchMovies();
   }, [token]);

   useEffect(() => {
      const initFavoritesMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie.id));
      setFavoritesMovies(initFavoritesMovies);
   }, [user, token]);

   const clearLocalStorage = () => {
      setUser(null);
      setToken(null);
      window.location.reload();
      localStorage.clear();
   };

   const onSearchChange = (event) => {
      event.preventDefault();
      setSearchField(event.target.value);
   };

   const filteredMovies = movies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchField.toLowerCase());
   });

   return (
      <BrowserRouter>
         <NavigationBar user={user} onLoggedOut={clearLocalStorage} />
         <Container>
            <Routes>
               <Route
                  exact
                  path="/signup"
                  element={
                     <Fragment>
                        {user ? (
                           <Navigate to="/" />
                        ) : (
                           <Col>
                              <SignupView />
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
                        ) : (
                           <Col>
                              <LoginView
                                 onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                 }}
                              />
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
                        ) : movies.length === 0 ? (
                           <Col>The list is empty!</Col>
                        ) : (
                           <MovieView
                              movies={movies}
                              favoritesMovies={favoritesMovies}
                              toggleFavoritesMovies={toggleFavoritesMovies}
                           />
                        )}
                     </Fragment>
                  }
               />

               <Route
                  path="/"
                  element={
                     <Fragment>
                        {!user ? (
                           <Navigate to="/login" />
                        ) : movies.length === 0 ? (
                           <Col>
                              <h1>Loading...</h1>
                           </Col>
                        ) : (
                           <Row gap={5} className="justify-content-center py5 mb5">
                              <SearchBox searchChange={onSearchChange} />
                              {filteredMovies.map((movie) => (
                                 <Col lg={3} className="m-3" key={movie.id}>
                                    <MovieCard
                                       movie={movie}
                                       isFavorites={favoritesMovies.some((favMovie) => favMovie.id === movie.id)}
                                       toggleFavoritesMovies={toggleFavoritesMovies}
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
                        {!user ? (
                           <Navigate to="/login" />
                        ) : (
                           <ProfileView
                              user={user}
                              token={token}
                              movies={movies}
                              favoritesMovies={favoritesMovies}
                              toggleFavoritesMovies={toggleFavoritesMovies}
                           />
                        )}
                     </Fragment>
                  }
               />
            </Routes>
         </Container>
      </BrowserRouter>
   );
};

export default MainView;
