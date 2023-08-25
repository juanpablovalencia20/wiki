import "./addPost.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from "react";
import { Close, PermMedia } from "@mui/icons-material";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "../../util/hooks";
import { PUBLICATIONS_QUERY } from "../posts/Posts";
import { Button } from "semantic-ui-react";
import makeAnimated from 'react-select/animated';


function AddPost() {
  const { user } = useContext(AuthContext);
  const [mediaFiles, setMediaFiles] = useState([]);
  const { onChange, onSubmit, values } = useForm(createPublicationCallBack, {
    description: "",
  });

  const animatedComponents = makeAnimated();

  const { data: publicationsData,loading: publicationsLoading, refetch: refetchPublications } = useQuery(PUBLICATIONS_QUERY);

  const [createPublication, { error }] = useMutation(CREATE_PUBLICATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: PUBLICATIONS_QUERY,
      });

      values.description = "";

      proxy.writeQuery({ query: PUBLICATIONS_QUERY, data });
    },
  });

  async function createPublicationCallBack() {
    await createPublication({
      variables: {
        description: values.description,
      },
    });

    if (!publicationsLoading) {
      await refetchPublications();
    }
  }

  const removeImage = (index) => {
    const updatedMediaFiles = [...mediaFiles];
    updatedMediaFiles.splice(index, 1);
    setMediaFiles(updatedMediaFiles);
  };



  return (
    <form onSubmit={onSubmit} noValidate className={error ? "loading" : ""}>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img src={user.profile_img} alt="" className="shareProfileImg" />
            <textarea
              type="text"
              rows={2}
              style={{ resize: "none", overflow: "hidden" }}
              placeholder={"Que quieres compatir, " + user.name + "?"}
              value={values.description}
              name="description"
              onChange={onChange}
              required
              className="shareInput"
            />
            <Button type="submit">
              <SendRoundedIcon />
            </Button>
          </div>
          <hr className="shareHr" />
          {mediaFiles.map((file, index) => (
            <div className="shareImgContainer" key={index}>
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="shareImg"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  className="shareVideo"
                  controls
                />
              )}
              <Close
                className="shareCancelImg"
                onClick={() => removeImage(index)}
              />
            </div>
          ))}
          <div className="shareBottom">
            <div className="shareOptions">
        
           
              <label htmlFor="file" className="shareOption">
                <PermMedia
                  className="shareIcon"
                  style={{ color: "#2e0196f1" }}
                />
                <span className="shareOptionText">Foto/Video</span>
                <input
                  type="file"
                  id="file"
                  accept=".png, .jpeg, .jpg, .mp4, .avi, .mov"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setMediaFiles([...mediaFiles, ...e.target.files])
                  }
                  multiple 
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

const CREATE_PUBLICATION = gql`
  mutation createPublication($description: String!) {
    createPublication(publication: { description: $description }) {
      id
      description
    }
  }
`;


export default AddPost;
