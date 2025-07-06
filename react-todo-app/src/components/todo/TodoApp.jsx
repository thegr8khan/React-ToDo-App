import './TodoApp.css';
import React, { useState } from 'react';


export default function TodoApp() {
  return (
    <div className="TodoApp">
      To-Do Management Application
      <LoginComponent />
      {/* <WelcomeComponent /> */}
    </div>
  );
}

function LoginComponent() {

    const [username, setUsername] = useState('thegreatkhan');
    const [password, setPassword] = useState('');

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

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
        } else {
            setShowErrorMessage(true);
            setShowSuccessMessage(false);
            console.log('Login Failed! Please check your credentials.');
        }
    }
    
    return (
        <div className="Login">
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
  return (
    <div className="Welcome">
      Welcome Component
    </div>
  );
}