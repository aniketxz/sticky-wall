import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(-1);
    }, 1500); // 1.5 seconds delay for user to see the message
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>404 - Not Found</h1>
      <p>
        The page you are looking for does not exist.
        <br />
        Redirecting you back...
      </p>
    </div>
  );
};

export default NotFound;
