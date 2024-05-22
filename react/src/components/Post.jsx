import LikeButton from "./LikeButton";

function Post(props) {
  return (
    <>
      {props.content} - {props.author}
      <div>{props.loggedInStatus ? <LikeButton /> : ""}</div>
    </>
  );
}
export default Post;
