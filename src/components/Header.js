import React from 'react';
import battleshipIconLeft from '../img/battleshipIconLeft.png';
import battleshipIconRight from '../img/battleshipIconRight.png';

const Header = () => {
  return (
    <div className='header'>
      <img className='battleshipIcon' src={battleshipIconLeft} alt='battleship icon' />
      <h1>BATTLESHIPS</h1>
      <img className='battleshipIcon' src={battleshipIconRight} alt='battleship icon' />
    </div>
  );
};

export default Header;