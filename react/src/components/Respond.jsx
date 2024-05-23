import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Respond() {
  const { id } = useParams();
  const [directReportsPosts, setDirectReportsPosts] = useState([]);
  console.log("id : ", id);

  useEffect(() => {
    const fetchDirectReports = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:3000/employee/${id}/reports/posts`
        );
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        let json_response = await response.json();
        console.log("direct reports posts response: ", json_response);
        setDirectReportsPosts(json_response);
      } catch (error) {
        console.error("Error fetching employee info:", error);
      }
    };
    fetchDirectReports(id);
  }, [id]);

  return (
    <div>
      <h1>Review Employee Feedback</h1>
      <img src="../../public/incognito.png" width={75} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "space-around",
          margin: 20,
        }}
      >
        {directReportsPosts.map((post) => (
          <div
            key={post.post_id}
            style={{
              outline: "red solid 1px",
              background: "lightpink",
              borderRadius: "10px",
              color: "red",
              margin: 5,
              padding: 5,
            }}
          >
            <h3>{post?.subject}</h3>
            <h4>{post?.content}</h4>
            <p>{post?.timestamp}</p>
            <button style={{ marginBottom: 15 }}>Respond</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Respond;
