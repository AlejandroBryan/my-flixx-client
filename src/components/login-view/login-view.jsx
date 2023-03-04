import { useState } from "react";

const LoginView = ({onLoggedIn}) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {

    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    }

    fetch('https://myflixx.herokuapp.com/api/v1/users/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
    .then(({user, token}) =>{
      console.log('Login response', user);
      if(user){
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', JSON.stringify(token))
        onLoggedIn(user, token)
      }
      else{
        alert('Login failed')
      }
    }).catch((error) => alert('Something went wrong', error.message))
  }
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            required
          
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };

  export default LoginView;