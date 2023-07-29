import "./home.scss";
import Posts from "../../components/posts/Posts";
import StoryReel from "../../components/storyReel/StoryReel";
import AddPost from "../../components/addPost/AddPost";
function Home() {
  
  return (
    <div className="home">
      <StoryReel />
      <AddPost/>
      <Posts />
    </div>
  );
}

export default Home;
