import React from 'react';
import './Main.scss';

function Main({ handleClick }) {
  return (
    <div className='main'>
      <h1 className='header'>Weather Forecast</h1>
      <button className='button' onClick={handleClick}>
        Check Weather here!
      </button>
    </div>
  );
}

export default Main;
