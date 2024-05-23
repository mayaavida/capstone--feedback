import React from "react";
import Button from "./Button";
// import Incognito from "../../public/incognito.png";

function Home() {
  return (
    <div>
      <h1>Incognito Mode</h1>
      <img src="../../public/incognito.png" width={75} />
      <div className="card">
        <h4>
          Allow your employees to give feedback or send questions anonymously to
          their managers!
        </h4>
      </div>
      <div>
        <Button name="Login" page="login" />
        <Button name="Create Account" page="register" />
      </div>
    </div>
  );
}

export default Home;
