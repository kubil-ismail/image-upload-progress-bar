import React from "react";

function LoadingImage({ valuenow, valuemin, valuemax }) {
  return (
    <div className="card-img-loading">
      {/* Progress */}
      <div className="progress mb-3">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          style={{ width: `${valuenow}%` }}
          aria-valuenow={valuenow}
          aria-valuemin={valuemin}
          aria-valuemax={valuemax}
        >
          {valuenow}%
        </div>
      </div>
    </div>
  );
}

export default LoadingImage;
