import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

function WelcomeComponent() {
  const {username} = useParams();

  const authContext = useAuth();

  const [message, setMessage] = useState(null);

  function callHelloWorldRestAPI() {
    // Call the REST API here
    console.log("Called");

    retrieveHelloWorldPathVariable('Nayab', authContext.token)
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("Cleanup"));
  }

  function successfulResponse(response) {
    console.log(response);
    setMessage(response.data.message);
  }

  function errorResponse(error) {
    console.log(error);
  }

  return (
    <div className="WelcomeComponent">
      <h1>Welcome {username}</h1>
      <div>
        Manage Your todos. <Link to="/todos">Click Here</Link>
      </div>
      <div>
        <button className="btn btn-success m-5" onClick={callHelloWorldRestAPI}>Call Hello World</button>
      </div>
      <div className='text-info'>
        {message}
      </div>
    </div>
  );
}

export default WelcomeComponent