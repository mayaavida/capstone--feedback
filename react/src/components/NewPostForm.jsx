function NewPostForm(props) {
  return (
    <div>
      {props.loggedInStatus ? (
        <>
          <label htmlFor="newPost">Do you feedback to give or a question to ask?</label>
          <textarea id="newPost" className="textarea"></textarea>
          <br />
          <button>Post!</button>
        </>
      ) : (
        "log in to Capstone Feedback."
      )}
    </div>
  );
}
export default NewPostForm;
