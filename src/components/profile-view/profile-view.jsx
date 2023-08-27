import { Fragment, useState } from 'react';
import { Row} from 'react-bootstrap';
import { API } from '../../utils';
import UpdateView from './update-view';
import FavoriteMovies from './favorites-movies';
import UserInfo from './user-info';

const ProfileView = ({ user, token, favoritesMovies, toggleFavoritesMovies }) => {
      const handleDelete = () => {
      fetch(`${API}/users/${user.Username}`, {
         method: 'DELETE',
         headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
         },
      })
         .then((response) => {
            if (response.ok) {
               alert('Successfully Delete');
               window.location.reload();
               localStorage.clear();
            } else {
               alert('Failed to update');
            }
         })
         .catch((error) => {
            console.log(error);
         });
   };
   return (
      <Fragment>
         <Row className="justify-content-center  mt-4 ">
            <UserInfo user={user} handleUserDelete={handleDelete} />
            <UpdateView user={user} token={token} />
            <FavoriteMovies favoritesMovies={favoritesMovies} toggleFavoritesMovies={toggleFavoritesMovies} />
         </Row>
      </Fragment>
   );
};

export default ProfileView;
