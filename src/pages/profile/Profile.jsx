import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile">
      <div className="images">
        <img src={user.cover_img} alt="" className="cover" />
        <img src={user.profile_img} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{user.name}</span>
            <div className="info">
              <div className="item">
                <span>Colombia</span>
              </div>
              {/* <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div> */}
            </div>
            <button>Seguir</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
}

export default Profile;
