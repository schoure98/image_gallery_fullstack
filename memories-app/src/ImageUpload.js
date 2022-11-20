import React, { useState, useEffect, useRef } from "react";
import "./ImageUpload.css";
import { Button } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";

const ImageUpload = ({ image, setImage }) => {
  const [previewUrl, setpreviewUrl] = useState();
  const filePickerRef = useRef();

  useEffect(() => {
    if (!image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setpreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  function pickedHandler(event) {
    let pickedImage;
    if (event.target.files && event.target.files.length === 1) {
      pickedImage = event.target.files[0];
      setImage(pickedImage);
    }
  }
  function pickedImageHandler(event) {
    filePickerRef.current.click();
    let pickedImage;
    if (event.target.files && event.target.files.length === 1) {
      pickedImage = event.target.files[0];
      setImage(pickedImage);
      console.log("pickedImageHandler");
    }
  }

  return (
    <div className="user-note-collection-main cent">
      <input
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${"center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && (
            <div className="center">
              <Button
                className="image-upload-button"
                type="button"
                onClick={pickedImageHandler}
              >
                {" "}
                +{" "}
              </Button>
            </div>
          )}
        </div>
        <div>
          {previewUrl && (
            <div className="center">
              <Button
                className="image-upload-button"
                type="button"
                onClick={pickedImageHandler}
              >
                <MdModeEdit className="icon"></MdModeEdit>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ImageUpload;
