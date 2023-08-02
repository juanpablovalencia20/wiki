import "./addPost.scss";
import { AuthContext } from "../../context/authContext"
import { useContext, useState } from "react";
import { Close, EmojiEmotions, PermMedia } from "@mui/icons-material";
import TagRoundedIcon from '@mui/icons-material/TagRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Picker from "@emoji-mart/react";

function AddPost() {
  const { user } = useContext(AuthContext);
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);

  const removeImage = (index) => {
    const updatedMediaFiles = [...mediaFiles];
    updatedMediaFiles.splice(index, 1);
    setMediaFiles(updatedMediaFiles);
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={user.profile_img} alt="" className="shareProfileImg" />
          <textarea
            type="text"
            rows={2}
            style={{ resize: "none", overflow: "hidden" }}
            placeholder={"Que quieres compatir, " + user.name + "?"}
            value={input}
            className="shareInput"
            onChange={(e) => setInput(e.target.value)}
          />
          <SendRoundedIcon />
        </div>
        <hr className="shareHr" />
        {mediaFiles.map((file, index) => (
          <div className="shareImgContainer" key={index}>
            {file.type.startsWith("image/") ? (
              <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            ) : (
              <video src={URL.createObjectURL(file)} className="shareVideo" controls />
            )}
            <Close className="shareCancelImg" onClick={() => removeImage(index)} />
          </div>
        ))}
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <TagRoundedIcon className="shareIcon" style={{ color: "#bb0000f2" }} />
              <span className="shareOptionText">Categorias</span>
            </div>
            <label htmlFor="file" className="shareOption">
              <PermMedia className="shareIcon" style={{ color: "#2e0196f1" }} />
              <span className="shareOptionText">Foto/Video</span>
              <input
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg, .mp4, .avi, .mov"
                style={{ display: "none" }}
                onChange={(e) => setMediaFiles([...mediaFiles, ...e.target.files])}
                multiple // Permite seleccionar múltiples archivos
              />
            </label>
            <div
              onClick={() => setShowEmojis(!showEmojis)}
              className="shareOption"
            >
              <EmojiEmotions className="shareIcon" style={{ color: "#bfc600ec" }} />
              <span className="shareOptionText">Emojis</span>
            </div>
          </div>
        </div>
        {showEmojis && (
          <div className="emoji">
            <Picker onEmojiSelect={addEmoji} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPost;
