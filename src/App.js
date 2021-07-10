import React from "react";
import LoadingImage from "./componentss/LoadingImage";
import ErrorImage from "./componentss/ErrorImage";
import "./App.css";

function App() {
  const [image, setImage] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [fileUrl, setFileUrl] = React.useState(null);
  const inputFile = React.useRef(null);
  const onSelectFile = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const handleChange = (e) => {
    //  get first file in array
    const file = e?.target?.files[0];

    // set initial state
    setImage(file);
    setLoading(true);
    setError(null);

    // upload image
    handleUpload(file);
  };

  const handleUpload = (file) => {
    const objectUrl = URL.createObjectURL(file);

    // set state
    setLoading(false);
    setFileUrl(objectUrl);
    setError(null);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-lg-center align-items-center">
          <div className="col col-lg-5">
            <div className="card">
              {/* Loading Image */}
              {loading && (
                <LoadingImage valuemax="100" valuemin="0" valuenow="80" />
              )}
              {/* Handle Error */}
              {error && <ErrorImage errorMsg={error} />}
              {/* Handle Image */}
              {fileUrl && (
                <img
                  className="card-top-image"
                  src={fileUrl}
                  alt={image.name}
                />
              )}
              {/* Placeholder image */}
              {!fileUrl && !loading && (
                <img
                  className="card-top-image"
                  src="https://i.stack.imgur.com/y9DpT.jpg"
                  alt="default"
                />
              )}
              <div className="card-body">
                {/* Input hidden only */}
                <input
                  id="file-select"
                  accept="image/*"
                  type="file"
                  ref={inputFile}
                  onChange={handleChange}
                />
                {/* Image Name */}
                {image.name && <p className="text-start">{image.name}</p>}
                {/* Button */}
                <div className="d-grid">
                  <button
                    className="btn btn-primary"
                    onClick={onSelectFile}
                    disabled={loading}
                  >
                    {/* handle loading */}
                    {loading && (
                      <>
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading...
                      </>
                    )}
                    {!loading && "Select image"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
