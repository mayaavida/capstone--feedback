import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ name, page }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        margin: 20,
        backgroundColor: "lightgreen",
        outlineColor: "darkgreen",
        outlineStyle: "solid",
        outlineWidth: 1,
        borderRadius: 5,
        cursor: "pointer",
      }}
      onClick={() => navigate(`/${page}`)}
    >
      <h3 style={{ margin: 10, padding: 10, color: "darkgreen" }}>{name}</h3>
    </div>
  );
}

export default Button;
