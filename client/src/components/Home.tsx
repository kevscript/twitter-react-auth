import React, { useEffect, useState } from 'react';
import Header from './Header';

const Home: React.FC = () => {
  const [state, setState] = useState({
    user: {
      name: ""
    },
    error: "",
    authenticated: false
  })

  useEffect(() => {
    fetch("http://localhost:4000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.status === 200) return res.json();
      throw new Error("failed to authenticate user");
    }).then(json => {
      setState(currentState => ({
        ...currentState,
        authenticated: true,
        user: json.user
      }))
    }).catch(err => {
      setState(currentState => ({
        ...currentState,
        authenticated: false,
        error: "Failed to authenticate user"
      }))
    })
  }, [])

  const handleAuth = () => {
    setState(currentState => ({
      ...currentState,
      authenticated: false
    }));
  }

  return (
    <div>
      <Header authenticated={state.authenticated} handleAuth={handleAuth} />
      <div>
        {
          !state.authenticated
            ? <h1>Welcome! Authenticate yourself.</h1>
            : <div>
              <h1>Welcome {state.user.name}! You have login succcessfully.</h1>
            </div>
        }
      </div>
    </div>
  )
}

export default Home