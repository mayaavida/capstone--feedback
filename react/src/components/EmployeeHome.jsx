import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EmployeeHome() {
  const { id } = useParams();
  const [employeeInfo, setEmployeeInfo] = useState([]);

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
    fetchEmployeeInfo(id);
  }, [id]);

  return (
    <div>
      <h1>
        Welcome, {employeeInfo?.employeeDetails?.firstName}!
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
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
          <h4>Company</h4>
          <p>{employeeInfo.employeeDetails?.company}</p>
          <h4>Line of Business</h4>
          <p>{employeeInfo.employeeDetails?.lineOfBusiness}</p>
          <h4>Manager</h4>
          <p>{employeeInfo.employeeDetails?.manager}</p>
        </div>
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
          <h4>Posts</h4>
        </div>
      </div>
    </div>
  );
}

export default EmployeeHome;
