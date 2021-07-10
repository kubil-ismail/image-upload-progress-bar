import React from "react";

function ErrorImage({ errorMsg }) {
  return (
    <div className="alert alert-danger" role="alert">
      {errorMsg || "Something error, try again"}
    </div>
  );
}

export default ErrorImage;
