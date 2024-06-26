import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("username and password: ", username, password);
    fetchUserID(username);
  };

  const fetchUserID = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:3000/getemployee/${username}`
      );
      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      let json_response = await response.json();
      navigate(`/employee/${json_response?.employeeId}`);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
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
      <form onSubmit={handleLogin} className="mt-5">
        <div className="form-group">
          <h4>Username</h4>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <h4>Password</h4>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: 20 }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
