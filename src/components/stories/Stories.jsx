import React from 'react';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import './stories.scss';

function Story({ image, profileSrc, title, showButton, onButtonClick }) {
  return (
    <div style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat' }} className="story">
      <Avatar className="story__avatar" src={profileSrc} />
      <h4>{title}</h4>
      {showButton && (
        <div className="story__button">
          <Fab color="primary" aria-label="Add" onClick={onButtonClick}>
            <AddIcon />
          </Fab>
          <div className="add__history">
          <span>Añadir Historia</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Story;
