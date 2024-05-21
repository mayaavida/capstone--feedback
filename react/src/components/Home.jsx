import React from "react";
import Button from "./Button";

function Home() {
  return (
    <div>
      <h1>Employee Feedback App</h1>
      <div className="card">
        <h5>
          Allow your employees to give feedback or send questions anonymously to
          their managers
        </h5>
      </div>
      <div>
        <Button name="Login" page="login" />
        <Button name="Create Account" page="register" />
      </div>
    </div>
  );
}

export default Home;
