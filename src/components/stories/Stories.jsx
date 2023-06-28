import { useContext } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/authContext"

const Stories = () => {

  const {currentUser} = useContext(AuthContext)


  const stories = [
    {
      id: 1,
      name: "John Doe",
      img: "https://miro.medium.com/v2/resize:fit:1400/1*XTC3AOBES_rptdQdtiVf5Q.png",
    },
    {
      id: 2,
      name: "John Doe",
      img: "https://code.visualstudio.com/opengraphimg/opengraph-home.png",
    },
    {
      id: 3,
      name: "John Doe",
      img: "https://miro.medium.com/v2/resize:fit:1400/1*2ry-iDo34Dn-0cloQ5gYiA.png",
    },
    {
      id: 4,
      name: "John Doe",
      img: "https://res.cloudinary.com/highereducation/images/f_auto,q_auto/v1659635843/BestColleges.com/Bootcamp-Student-Learning-to-Code_301240e55a/Bootcamp-Student-Learning-to-Code_301240e55a.jpg",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
          <button>+</button>
        </div>
      {stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories