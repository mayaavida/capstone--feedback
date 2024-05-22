import { useState, useMemo } from "react";
function LikeButton() {
  const [likes, setLikes] = useState(0);

  function processData(data) {
    //does things that take time
    return data;
  }
  let bigFile;

  const thedata = useMemo(() => processData(bigFile), [bigFile]);

  return <button onClick={() => setLikes(likes + 1)}>{likes} Likes</button>;
}
export default LikeButton;
