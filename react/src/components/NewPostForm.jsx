import { useNavigate, useParams } from "react-router-dom";

function NewPostForm() {
  const { id } = useParams();
  // return (
  //   <div>
  //     {props.loggedInStatus ? (
  //       <>
  //         <label htmlFor="newPost">Do you feedback to give or a question to ask?</label>
  //         <textarea id="newPost" className="textarea"></textarea>
  //         <br />
  //         <button>Post!</button>
  //       </>
  //     ) : (
  //       "log in to Capstone Feedback."
  //     )}
  //   </div>
  // );
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/employee/${id}`;
    navigate(path);
  };

  return (
    <div>
      <>
        <h4 htmlFor="newPost">
          Do you have feedback to give or a question to ask?
        </h4>
        <textarea id="newPost" className="textarea"></textarea>
        <br />
        <button
          color="green"
          type="submit"
          className="btn btn-primary"
          onClick={routeChange}
        >
          Post!
        </button>
      </>
    </div>
  );
}
export default NewPostForm;
