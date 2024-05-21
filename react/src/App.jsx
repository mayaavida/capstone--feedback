import { useState, useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000");
        if (!response.ok) {
          throw new Error("Data could not be fetched!");
        }
        const data = await response.json();
        console.log("this is demo data: ", data);
      } catch (error) {
        console.log("Error fetching demo data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Employee Feedback App</h1>
      <div className="card">
        <h5>
          Allow your employees to give feedback or send questions anonymously to
          their managers
        </h5>
      </div>
    </>
  );
}

export default App;
