import { useState } from "react";

 const SignupView = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit =(event)=>{

        event.preventDefault();

        const data = {
            Firstname: firstname,
            Lastname: lastname,
            Username:  username,
            Password:  password,
            Email:     email,
            Birthday:  birthday
        }

        fetch('https://myflixx.herokuapp.com/api/v1/users/register',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response)=>{
            if(response.ok){
                alert('Successfully registered');
                window.location.reload();
            }else{
                alert('Failed to register')
            }
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <legend>Register:</legend>
            <label>
                Firstname:
                <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
                minLength="3"
                maxLength="30"
                />
            </label>

            <label>
                Lastname:
                <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
                minLength="3"
                maxLength="30"
                />
            </label>

            <label>
                Username:
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
                maxLength="15"
                />
                
            </label>

            <label>
                Password:
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                maxLength="12"
                />
            </label>

            <label>
                Email:
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </label>

            <label>
                Birthday:
                <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                />
            </label>
          <button type="submit">Submit</button>
        </form>
      );
}

export default SignupView;
