import { Fragment, useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";
import UpdateView from "./update-view";
import FavoriteMovies from "./favorites-movies";
import UserInfo from "./user-info";

const ProfileView = ({ user, token, favMovies, toggleFavMovies }) => {
  const [firstname, setFirstname] = useState(user.Firstname);
  const [lastname, setLastname] = useState(user.Lastname);
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(new Date(user.Birthday));

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Firstname: firstname,
      Lastname: lastname,
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`http://localhost:5000/api/v1/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Successfully updated");
        window.location.reload();
      } else {
        alert("Failed to update");
      }
    });
  };

  const handleToggle = (movie) => {
    toggleFavMovies(movie);
  };
  return (
    <Fragment>
      <Row className="justify-content-center  mt-4 ">
        <UserInfo user={user} />
        <UpdateView user={user} token={token} />
        <FavoriteMovies  favMovies={favMovies} toggleFavMovies={toggleFavMovies}/>

    {/*     <Col md="10" className="m-5">
          {favMovies ? (
            <Row>
              <h3>Favorites movies list</h3>
              {favMovies.map((movie) => (
                <Col md="4" key={movie.id} className="mt-2">
                  <MovieCard movie={movie}  toggleFavMovies={handleToggle} />
                </Col>
              ))}
            </Row>
          ) : (
            <Col>
              <h3>Favorites movies is empty</h3>
            </Col>
          )}
        </Col> */}
      </Row>
    </Fragment>
  );
};

export default ProfileView;
