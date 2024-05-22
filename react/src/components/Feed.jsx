import Post from "./Post";

function Feed(props) {
  return (
    <>
      {props.posts.map((post) => (
        <li key={post.id}>
          <Post
            content={post.content}
            author={post.author}
            loggedInStatus={props.loggedInStatus}
          />
        </li>
      ))}
    </>
  );
}
export default Feed;
