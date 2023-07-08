import "./home.scss";
import Posts from "../../components/posts/Posts";
import Stories from "../../components/stories/Stories";
import AddPost from "../../components/addPost/AddPost";
function Home() {
  
  return (
    <div className="home">
      <Stories />
      <AddPost/>
      <Posts />
    </div>
  );
}

export default Home;
