import React from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar'
import BodyRouter from './components/BodyRouter'

function EMRApp() {
  return (
    <>
      <Navbar/>
      <BodyRouter/>
    </>
  );
}

export default EMRApp;
