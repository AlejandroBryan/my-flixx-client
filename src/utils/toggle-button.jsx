import { useState } from "react";
import { Heart } from 'react-bootstrap-icons';

const toggleFavMovies =({movie}) =>{

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem('token');
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);

    console.log(user)
    console.log(token)


       
    

    const DeleteFavoritesMovies =(event)=>{

        event.preventDefault();
    
        fetch(`http://localhost:5000/api/v1/users/${user.Username}/movies/${movie.id}`,{
            method: 'Delete',
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin" : "*", 
                "Access-Control-Allow-Credentials" : true 
            }
        }).then((response)=>{
            if(response.ok){
                alert('Successfully updated');
                window.location.reload();
            }else{
                alert('Failed to update')
            }
        })
    };
   return()


}}

export default toggleFavMovies;