import Post from "../post/Post";
import "./posts.scss";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

function Posts () {

  const { data, loading, error } = useQuery(PUBLICATIONS_QUERY);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return <div className="posts">
    {data.publications.map(publication=>(
      <Post publication={publication} key={publication.id}/>
    ))}
  </div>;
};

export const PUBLICATIONS_QUERY = gql`
 {
  publications{
    id
    description
    createdAt
    user{
      id
      name
      email
      profile_img
      
    }
    multimedia{
      id
      mimeType
      url
    }
    comments{
      comment
    }
  }
}
`;

export default Posts;