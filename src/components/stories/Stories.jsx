import { useContext, useRef, useState } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Stories = () => {

  const {user} = useContext(AuthContext)


  const stories = [
    {
      id: 1,
      name: "John Doe 1",
      img: "https://miro.medium.com/v2/resize:fit:1400/1*XTC3AOBES_rptdQdtiVf5Q.png",
    },
    {
      id: 2,
      name: "John Doe 2",
      img: "https://code.visualstudio.com/opengraphimg/opengraph-home.png",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://miro.medium.com/v2/resize:fit:1400/1*2ry-iDo34Dn-0cloQ5gYiA.png",
    },
    {
      id: 4,
      name: "John Doe 4",
      img: "https://res.cloudinary.com/highereducation/images/f_auto,q_auto/v1659635843/BestColleges.com/Bootcamp-Student-Learning-to-Code_301240e55a/Bootcamp-Student-Learning-to-Code_301240e55a.jpg",
    },
    {
      id: 1,
      name: "John Doe 1",
      img: "https://miro.medium.com/v2/resize:fit:1400/1*XTC3AOBES_rptdQdtiVf5Q.png",
    },
    {
      id: 2,
      name: "John Doe 2",
      img: "https://code.visualstudio.com/opengraphimg/opengraph-home.png",
    },
    {
      id: 3,
      name: "John Doe 3",
      img: "https://miro.medium.com/v2/resize:fit:1400/1*2ry-iDo34Dn-0cloQ5gYiA.png",
    },
    {
      id: 4,
      name: "John Doe 4",
      img: "https://res.cloudinary.com/highereducation/images/f_auto,q_auto/v1659635843/BestColleges.com/Bootcamp-Student-Learning-to-Code_301240e55a/Bootcamp-Student-Learning-to-Code_301240e55a.jpg",
    },
    {
      id: 4,
      name: "James",
      img: "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
    },
  ];

  const storiesRef = useRef(null);

  const handleScrollLeft = () => {
    const container = storiesRef.current;
    container.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
  };

  const handleScrollRight = () => {
    const container = storiesRef.current;
    container.scrollBy({
      left: 200,
      behavior: 'smooth',
    });
  };

  return (
    <div className="stories-container">
      <div className="stories-wrapper" ref={storiesRef}>
        <div className="scroll-button prev" onClick={handleScrollLeft}></div>
        <div className="stories">
        <div class="stories">
          <div class="story">
            <img src={user.profile_img} alt="" />
            <span>{user.name}</span>
            <button>+</button>
          </div>
          {stories.map(story => (
            <div class="story" key={story.id}>
              <img src={story.img} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
          </div>
          <div className="scroll-button next" onClick={handleScrollRight}></div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
