import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './TodoApp.css';

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginComponent />}></Route>
          <Route path='/login' element={<LoginComponent />}></Route>
          <Route path='/welcome/:username' element={<WelcomeComponent />}></Route>
          <Route path='*' element={<ErrorComponent />}></Route>    
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function LoginComponent() {

    const [username, setUsername] = useState('thegreatkhan');
    const [password, setPassword] = useState('');

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const navigate = useNavigate();

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit() {
        if(username === 'thegreatkhan' && password === 'password123') {
            setShowSuccessMessage(true);
            setShowErrorMessage(false);
            console.log('Login Successful!');
            navigate(`/welcome/${username}`);
        } else {
            setShowErrorMessage(true);
            setShowSuccessMessage(false);
            console.log('Login Failed! Please check your credentials.');
        }
    }
    
    return (
        <div className="Login">
          <h1>LOGIN</h1>
            <p>Enter your credentials to login.</p>
            {showSuccessMessage && <div className='successMessage'>Login Successful!</div>}
            {showErrorMessage && <div className='errorMessage'>Login Failed! Please check your credentials.</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    );
}



function WelcomeComponent() {
  const {username} = useParams();
  console.log(username);
  return (
    <div className="WelcomeComponent">
      <h1>Welcome {username}</h1>
    </div>
  );
}

function ErrorComponent() {
  return (
    <div className="ErrorComponent">
      <h1>An Error Occurred. Please try again later.</h1>
    </div>
  );
}