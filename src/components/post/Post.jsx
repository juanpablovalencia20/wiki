import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import ReactPlayer from "react-player";

function Post({ publication }) {
  const [commentOpen, setCommentOpen] = useState(false);
  const liked = false;

  console.log(publication);

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={publication.user.profile_img} alt="" />
            <div className="details">
              <Link
                to={`/profile/${publication.user.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{publication.user.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{publication.description}</p>

          <div style={{ display: "flex" }}>
            {publication.categories.map((categoria, index) => (
              <a
                key={index}
                href={`#${categoria.name}`}
                style={{ marginRight: "10px" }}
              >
                #{categoria.name}
              </a>
            ))}
          </div>

        
          <div className="image-grid">
  {publication.multimedia
    .filter(media =>media.mimeType.startsWith("video/"))
    .map((media, index) => (
      <div  key={index} className="grid-ass">
        <div className="video-wrapper">
          <ReactPlayer
            url={media.url}
            controls
            width="100%"
            height="100%"
          />
        </div>
      </div>
    ))}

  {publication.multimedia
    .filter( media => media.mimeType.startsWith("image/"))
    .map((media, index) => (
      <div key={index} className="grid-item">
        <div className="image-item">
          <img src={media.url} alt={`Image ${index}`} />
        </div>
      </div>
    ))}
</div>



        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
}

export default Post;
