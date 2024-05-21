import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ name, page }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        margin: 12,
        backgroundColor: "lightgreen",
        outlineColor: "darkgreen",
        outlineStyle: "solid",
        outlineWidth: 1,
        borderRadius: 5,
        cursor: "pointer",
      }}
      onClick={() => navigate(`/${page}`)}
    >
      <h5 style={{ margin: "5px", color: "darkgreen" }}>{name}</h5>
    </div>
  );
}

export default Button;
