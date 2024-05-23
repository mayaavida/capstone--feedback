import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Respond() {
  const { id } = useParams();
  const [directReports, setDirectReports] = useState("");
  console.log("id : ", id);

  useEffect(() => {
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
    fetchDirectReports(id);
  }, [id]);

  return (
    <div>
      <p>Hi</p>
    </div>
  );
}

export default Respond;
