import React from "react";
import LoadingImage from "./componentss/LoadingImage";
import ErrorImage from "./componentss/ErrorImage";
import firebase from "./Firebase";
import "./App.css";

function App() {
  const [image, setImage] = React.useState({});
  const [loading, setLoading] = React.useState(0);
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
    setError(null);

    // upload image
    handleUpload(file);
  };

  const handleUpload = (file) => {
    const uploadFile = firebase.storage().ref("/").child(file.name).put(file);

    uploadFile.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred * 100) / snapshot.totalBytes
        );
        setLoading(progress);
      },
      (error) => {
        setLoading(0);
        setError("Something error, try again !");
      },
      (res) => {
        uploadFile.snapshot.ref.getDownloadURL().then((url) => {
          setLoading(0);
          setError(null);
          setFileUrl(url);
          setImage(file);
        });
      }
    );
  };

  const isLoading = loading !== 0;
  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-lg-center align-items-center">
          <div className="col col-lg-5">
            <div className="card">
              {/* Loading Image */}
              {isLoading && (
                <LoadingImage valuemax="100" valuemin="0" valuenow={loading} />
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
              {!fileUrl && !isLoading && (
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
                {image.name && (
                  // SAMA TAMBAHIN INI YAK
                  <p className="text-start">
                    {image.name} <a href={fileUrl}> download</a>
                  </p>
                )}
                {/* Button */}
                <div className="d-grid">
                  <button
                    className="btn btn-primary"
                    onClick={onSelectFile}
                    disabled={isLoading}
                  >
                    {/* handle loading */}
                    {isLoading && (
                      <>
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Loading...
                      </>
                    )}
                    {!isLoading && "Select image"}
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
