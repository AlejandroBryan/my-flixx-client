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

 
  const handleDelete = ()=>{
    fetch(`https://myflixx.herokuapp.com/api/v1/users/${user.Username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Successfully Delete");
        window.location.reload();
        localStorage.clear();
      } else {
        alert("Failed to update");
      }
    }).catch((error) => {console.log(error)});
  }




  const handleToggle = (movie) => {
    toggleFavMovies(movie);
  };
  return (
    <Fragment>
      <Row className="justify-content-center  mt-4 ">
        <UserInfo user={user} handleUserDelete={handleDelete} />
        <UpdateView user={user} token={token} />
        <FavoriteMovies  favMovies={favMovies} toggleFavMovies={toggleFavMovies}/>
      </Row>
    </Fragment>
  );
};

export default ProfileView;
