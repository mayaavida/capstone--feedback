import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EmployeeHome() {
  const { id } = useParams();
  const [employeeInfo, setEmployeeInfo] = useState([]);
  const [employeePosts, setEmployeePosts] = useState([]);
  const [directReports, setDirectReports] = useState([]);

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/employee/${id}/newPost`;
    navigate(path);
  };

  useEffect(() => {
    const fetchEmployeeInfo = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/employee/${id}`);
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        let json_response = await response.json();
        setEmployeeInfo(json_response[0]);
      } catch (error) {
        console.error("Error fetching employee info:", error);
      }
    };
    const fetchEmployeePosts = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:3000/employee/${id}/posts`
        );
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        let json_response = await response.json();
        console.log("employee posts response: ", json_response);
        setEmployeePosts(json_response);
      } catch (error) {
        console.error("Error fetching employee info:", error);
      }
    };

    const fetchDirectReports = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:3000/employee/${id}/reports`
        );
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        let json_response = await response.json();
        console.log("direct reports response: ", json_response);
        setDirectReports(json_response);
      } catch (error) {
        console.error("Error fetching employee info:", error);
      }
    };

    fetchEmployeeInfo(id);
    fetchEmployeePosts(id);
    fetchDirectReports(id);
  }, [id]);

  const sendToResponse = () => {
    let path = `/respond/${employeeInfo?.employeeId}`;
    navigate(path);
  };

  return (
    <div>
      <h1>Welcome, {employeeInfo?.employeeDetails?.firstName}!</h1>
      {!employeeInfo?.employeeDetails?.isManager && (
        <div>
          <button
            style={{
              color: "darkgreen",
              backgroundColor: "lightgreen",
              marginBottom: 20,
            }}
            type="submit"
            className="btn btn-primary"
            onClick={routeChange}
          >
            Create New Post
          </button>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            outline: "solid 1px",
            borderRadius: "5px",
            padding: 13,
            width: "60%",
          }}
        >
          <h4>Company</h4>
          <p>{employeeInfo.employeeDetails?.company}</p>
          <h4>Line of Business</h4>
          <p>{employeeInfo.employeeDetails?.lineOfBusiness}</p>
          <h4>Manager</h4>
          <p>{employeeInfo.employeeDetails?.manager}</p>
        </div>
        {!employeeInfo?.employeeDetails?.isManager && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                outline: "solid 1px",
                borderRadius: "5px",
                padding: 13,
                width: "60%",
              }}
            >
              <h4>Posts</h4>
              {employeePosts.map((post) => (
                <div key={post.post_id}>
                  <h5>{post.subject}</h5>
                  <p>{post.content}</p>
                  <p>{post.timestamp}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {employeeInfo?.employeeDetails?.isManager && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              outline: "solid 1px",
              borderRadius: "5px",
              padding: 13,
              width: "40%",
            }}
          >
            <div>
              <h4>Direct Reports</h4>
              {directReports.map((person) => (
                <div key={person?.employeeId}>
                  <p>
                    {person?.employeeDetails?.firstName}{" "}
                    {person?.employeeDetails?.lastName}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <button
                style={{ backgroundColor: "lightpink", color: "red" }}
                onClick={sendToResponse}
              >
                Respond to Feedback
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeHome;
