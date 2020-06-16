import React, {useState} from 'react';
import './Main.css';
import Navbar from './components/navigation/Navbar'
import BodyRouter from './components/BodyRouter'

const EMRApp = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Navbar loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <div id='bodyContainer'>
        <BodyRouter loggedIn={loggedIn} setIsLoggedIn={setIsLoggedIn}/>
      </div>
    </>
  );
}

export default EMRApp;
