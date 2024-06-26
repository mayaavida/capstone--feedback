import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

function NewPostForm() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const { id } = useParams();
  let navigate = useNavigate();

  const handlePost = async (event) => {
    event.preventDefault();
    console.log(newPost);

    const addNewPost = async (id) => {
      try {
        // POST request to the API to add a new post
        const response = await fetch(
          `http://localhost:3000/employee/${id}/newPost`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("server response", data);
      } catch (error) {
        console.error("Error posting data", error);
      }
    };
    let newPostId = newPost.post_id;

    addNewPost(id);
    // updateEmployee(newPostId);
    navigate(`/employee/${id}`);
  };

  const newPost = {
    timestamp: new Date(),
    post_id: Math.floor(Math.random() * 2001),
    subject: subject,
    content: content,
    response: "",
    sentiment: "",
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: "lightblue",
        margin: 10,
        padding: 20,
        borderRadius: "10px",
      }}
    >
      <form onSubmit={handlePost} className="mt-5">
        <div className="form-group">
          <h3 htmlFor="subject">Subject</h3>
          <textarea
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="form-group">
          <h3 htmlFor="content">Content</h3>
          <textarea
            type="text"
            className="form-control"
            id="content"
            placeholder="Enter Feedback or Question"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            cols="50"
          />
        </div>
        <button
          style={{ color: "white", backgroundColor: "navy", marginTop: 20 }}
          type="submit"
          className="btn btn-primary"
        >
          Submit Feedback!
        </button>
      </form>
    </div>
  );
}

export default NewPostForm;
