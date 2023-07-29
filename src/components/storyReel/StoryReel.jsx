import React, { useContext, useRef } from "react";
import Story from "../stories/Stories";
import "./storyReel.scss";
import { AuthContext } from "../../context/authContext";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function StoryReel() {
  const { user } = useContext(AuthContext);

  const storyData = [
    {
      image:
        "https://www.mundodeportivo.com/us/files/image_449_220/uploads/2022/11/27/6382f20e83ea6.jpeg",
      profileSrc:
        "https://media.revistagq.com/photos/637e3a96efd28422764c6b4f/1:1/w_2148,h_2148,c_limit/GettyImages-1443193308.jpg",
      title: "Code With Akky",
    },
    {
      image:
        "https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2021%2F0827%2Fr901184_1296x729_16%2D9.jpg",
      profileSrc:
        "https://www.si.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2NzQ0NjUxMDk1NDE4NDk4/cristiano-ronaldo-festeja.jpg",
      title: "Code With Akky",
    },
    {
      image:
        "https://www.mundodeportivo.com/files/image_449_220/uploads/2019/06/10/60e744f2e04e0.jpeg",
      profileSrc:
        "https://media.admagazine.com/photos/6399202e9410b400d2dc863c/1:1/pass/gettyimages-1448163642.jpg",
      title: "Code With Akky",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR42gF_sEzvtIOj9YM5eN688HzdsFwLan9l5z-NFNasytYWYpeMY_G8-KWRgeejz6duxFU&usqp=CAU",
      profileSrc:
        "https://media.admagazine.com/photos/637fe401d38dc73ab7d07224/1:1/pass/cristiano-ronaldo.jpg",
      title: "Code With Akky",
    },
    {
      image:
        "https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2021%2F0827%2Fr901184_1296x729_16%2D9.jpg",
      profileSrc:
        "https://media.admagazine.com/photos/637fe401d38dc73ab7d07224/1:1/pass/cristiano-ronaldo.jpg",
      title: "Code With Akky",
    },
    {
      image:
        "https://cdn.corrieredellosport.it/img/900/450/2022/09/26/093352014-39b1f37a-8b90-4de7-9b3e-83ec8c1ea7ea.jpg",
      profileSrc:
        "https://media.admagazine.com/photos/6399202e9410b400d2dc863c/1:1/pass/gettyimages-1448163642.jpg",
      title: "Code With Akky",
    },
    {
      image:
        "https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2021%2F0827%2Fr901184_1296x729_16%2D9.jpg",
      profileSrc:
        "https://media.admagazine.com/photos/637fe401d38dc73ab7d07224/1:1/pass/cristiano-ronaldo.jpg",
      title: "Code With Akky",
    },
    {
      image:
        "https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2021%2F0827%2Fr901184_1296x729_16%2D9.jpg",
      profileSrc:
        "https://media.admagazine.com/photos/637fe401d38dc73ab7d07224/1:1/pass/cristiano-ronaldo.jpg",
      title: "Code With Akky",
    },
  ];

  const storiesRef = useRef(null);

  const handleAddStory = () => {
  
  };

  const handleScrollLeft = () => {
    const container = storiesRef.current.parentNode;
    container.scrollTo({
      left: container.scrollLeft - 200,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    const container = storiesRef.current.parentNode;
    container.scrollTo({
      left: container.scrollLeft + 200,
      behavior: "smooth",
    });
  };
  

  return (
    <div className="stories-container">
      <div className="scroll-buttons">
        <KeyboardArrowLeftIcon
          className="scroll-button prev"
          onClick={handleScrollLeft}
        />
      </div>
      <div className="stories" ref={storiesRef}>
        <Story
          image={user.profile_img}
          profileSrc={user.profile_img}
          showButton={true}
          onButtonClick={handleAddStory}
        />
        {storyData.map((story, index) => (
          <Story
            key={index}
            image={story.image}
            profileSrc={story.profileSrc}
            title={story.title}
          />
        ))}
                <KeyboardArrowRightIcon
          className="scroll-button next"
          onClick={handleScrollRight}
        />
      </div>
    </div>
  );
}

export default StoryReel;
